import type { JSX } from 'react';

export function Hero(): JSX.Element {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <p className="eyebrow">My Blog Test</p>
      <h1 id="hero-title">A clean starter blog for thoughtful writing.</h1>
      <p className="hero-copy">
        Publish readable posts, organize ideas with metadata, and evolve this foundation into a full editorial experience.
      </p>
      <div className="hero-actions">
        <a className="button" href="#posts">Read featured posts</a>
        <a
          className="button button-secondary"
          href="https://developer.mozilla.org/en-US/docs/Web"
          target="_blank"
          rel="noreferrer"
        >
          Web docs
        </a>
      </div>
    </section>
  );
}
