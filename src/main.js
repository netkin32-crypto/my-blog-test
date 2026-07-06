import { featuredPosts, filterPosts, getAllTags } from './posts.js';

const formatter = new Intl.DateTimeFormat('en', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

const searchState = {
  query: '',
  tag: 'All',
};

export function createPostCard(post) {
  const article = document.createElement('article');
  article.className = 'post-card';

  article.innerHTML = `
    <div class="post-meta">
      <time dateTime="${post.date}">${formatter.format(new Date(post.date))}</time>
      <span>${post.readingTime}</span>
    </div>
    <h3>${post.title}</h3>
    <p>${post.excerpt}</p>
    <div class="post-footer">
      <span>${post.author}</span>
      <div class="tags" aria-label="Tags for ${post.title}">
        ${post.tags.map((tag) => `<span>${tag}</span>`).join('')}
      </div>
    </div>
  `;

  return article;
}

export function renderPosts(posts, container) {
  container.replaceChildren(...posts.map(createPostCard));
}

export function renderTagFilters(tags, container, selectedTag = 'All') {
  const tagButtons = ['All', ...tags].map((tag) => {
    const button = document.createElement('button');
    button.className = 'tag-filter';
    button.type = 'button';
    button.textContent = tag;
    button.dataset.tag = tag;
    button.setAttribute('aria-pressed', String(tag === selectedTag));
    return button;
  });

  container.replaceChildren(...tagButtons);
}

function updatePostResults(posts, container, countElement, emptyElement) {
  renderPosts(posts, container);
  countElement.textContent = `${posts.length} ${posts.length === 1 ? 'post' : 'posts'} found`;
  emptyElement.hidden = posts.length > 0;
}

function applySearch(posts, postGrid, resultCount, emptyState) {
  const filteredPosts = filterPosts(posts, searchState);
  updatePostResults(filteredPosts, postGrid, resultCount, emptyState);
}

const postGrid = document.querySelector('#post-grid');
const searchInput = document.querySelector('#post-search');
const tagFilters = document.querySelector('#tag-filters');
const resultCount = document.querySelector('#result-count');
const emptyState = document.querySelector('#empty-state');

if (postGrid && searchInput && tagFilters && resultCount && emptyState) {
  renderTagFilters(getAllTags(featuredPosts), tagFilters, searchState.tag);
  applySearch(featuredPosts, postGrid, resultCount, emptyState);

  searchInput.addEventListener('input', (event) => {
    searchState.query = event.target.value;
    applySearch(featuredPosts, postGrid, resultCount, emptyState);
  });

  tagFilters.addEventListener('click', (event) => {
    const tagButton = event.target.closest('button[data-tag]');

    if (!tagButton) {
      return;
    }

    searchState.tag = tagButton.dataset.tag;

    for (const button of tagFilters.querySelectorAll('button[data-tag]')) {
      button.setAttribute('aria-pressed', String(button === tagButton));
    }

    applySearch(featuredPosts, postGrid, resultCount, emptyState);
  });
}
