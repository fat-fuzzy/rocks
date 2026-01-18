---
title: Simplify doc
date_created: '2022'
date_updated: '2022'
slug: simplify-doc
id: '003'
tags: ['tooling']
---

## Context and Problem

I want to minimize maintenance and dependency management

- Remove features of repo that are overkill

Libraries I don't want to maintain for now:

- ADR libraries (used to generate architectural decision logs)
- Storybook (it is very heavy on dependencies, forces me to include React in my project)

But I still want to document my project efficiently

## Considered Options

Considered:

- [mdsvex](https://mdsvex.pngwn.io/)
  - ✅ simple and flexible
  - ✅ based on Svelte
  - ❓feature complete
  - ❓can be easily used for styleguide
  - ❌ old Svelte version
- [bookit](https://github.com/leveluptuts/bookit)
  - ✅ based on Svelte
  - ❓feature complete
  - ❓can be easily used for more than styleguide
  - ❌ light on doc
- [Histoire](https://histoire.dev/)
  - ✅ feature rich and flexible
  - ✅ replaces Storybook
  - ❓can be easily used for more than styleguide
  - ❓dependencies
  - ❌ based on Vue (but has project for Svelte)

## Decision

### ➖ Removed

To simplify maintenance, I will stop using the ADR system, as it is also a bit overkill.

Removed dependencies in root package.json:

```json
"dependencies": {
 "adr-log": "2.2.0",
 "madr": "2.1.2"
}
```

Removed scripts in root package.json:

```json
"scripts": {
    "build:doc": "adr-log -d ./packages/about/decisions",
    "build:design": "node  ./packages/design/node_modules/.bin/build.js",
    "build": "npm run build:doc",
},
```

Removed storybook

This was a lot dependency removals. I considered and made this decision while upgrading SvelteKit.
I departed from a fresh SvelteKit lib project for the **ui** package, and it did not include storybook. I then felt I did not to want to add it back (see reasons at the start of this document).

### ➕ Kept or added

ADR templates are useful, I'm keeping them for reference and for decision docs.

These are the resources used for ADR:

- [Markdown Any Decision Records](https://adr.github.io/madr/)
- [arc42 template](https://arc42.org/overview)
- [HTML Sanity Checker Architecture](https://hsc.aim42.org/documentation/hsc_arc42.html#section-introduction-and-goals)
- [biking2, Architecture and API](https://biking.michael-simons.eu/docs/index.html#section-introduction-and-goals)
- [Architecture decision record](https://github.com/joelparkerhenderson/architecture-decision-record)

🚧 Chosen option for doc: [mdsvex](https://mdsvex.pngwn.io/)

- Used [mdsvex svelte adder](https://github.com/svelte-add/mdsvex) which went smoothly using this command for pnpm:

```bash
pnpm dlx svelte-add@latest mdsvex
```

- It wasn't very clear how to load markdown files dynamically - this post helped : [Build a static site with SvelteKit](https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog#two-ways-to-load-markdown)
