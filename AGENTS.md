# Repository Guidelines

## Project Overview

This repository is a dependency-free static blog starter built with plain HTML, CSS, and JavaScript. Application source lives in `src/`, sample content lives in `content/`, automation scripts live in `scripts/`, and Node test-runner tests live in `test/`.

## Development Instructions

- Keep the project dependency-free unless a task explicitly requires adding a package.
- Use ES modules for JavaScript files.
- Keep styles in `src/styles.css` and favor responsive, accessible UI patterns.
- Do not wrap imports in `try`/`catch` blocks.
- Avoid tab indentation and trailing whitespace.

## Checks

Run these commands before committing changes when relevant:

```bash
npm run lint
npm run test
npm run build
```

## Pull Request Notes

Include a concise summary of user-facing changes and list the checks that were run.
