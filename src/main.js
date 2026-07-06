import { featuredPosts } from './posts.js';

const formatter = new Intl.DateTimeFormat('en', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

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

const postGrid = document.querySelector('#post-grid');

if (postGrid) {
  renderPosts(featuredPosts, postGrid);
}
