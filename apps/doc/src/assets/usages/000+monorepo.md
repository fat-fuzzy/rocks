---
title: Monorepo
date_created: '2023-07-23'
date_updated: '2024-07-21'
slug: monorepo
id: '000'
tags: ['example', 'doc', 'monorepo', 'wip']
---

## Stack

The main technologies I use to build this project are HTML, CSS, [Svelte](https://svelte.dev/) (with TypeScript), and Markdown.
There are also some WebGL shaders, that I add as I continue to learn, and I might add a backend at some point.

## Packages Overview

The repository is organized into 2 workspaces (these are top-level directories in the repository):

- **apps** : contains client facing code, organized by project. It contains **apps/doc** which is this site!
- **packages** : contains UI, web graphics, logic and experiments libraries, as well as common config

You can learn more about individual packages in the [Packages](/doc/usage/packages) section.

## Requirements

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/) and [Turborepo](https://turbo.build) to manage the packages and builds
- [Svelte](https://svelte.dev/), recently upgraded to [Svelte 5](https://svelte-5-preview.vercel.app/docs/introduction) that I use to build UI components
- [SvelteKit](https://kit.svelte.dev/), which helps me develop, build and package my sites or apps
- [Verdaccio](https://verdaccio.org/), which allows me to create a private registry and use these packages in other projects

The initial guide I used for this setup was [Turborepo's workspaces conventions](https://turbo.build/repo/docs/getting-started/existing-monorepo#configure-workspaces) and evolves as necessary.

## How to `...`

Use a private NPM Registry with Verdaccio

- Install verdaccio: [Verdaccio Doc - Installation](https://verdaccio.org/docs/installation)
- Launch the private registry with the command: `verdaccio`
- To publish a package to the private registry, run the following command in the package's root directory:

  ```shell
  pnpm publish --registry http://localhost:4873
  ```

- Use the package in another repository that has access to the private registry:

  ```shell
  pnpm i your-package --registry http://localhost:4873
  ```

## WIP

🚧 These items are work in progress

- **Testing**
  - Integrating [Vitest](https://vitest.dev/)
    - [Examples](https://github.com/vitest-dev/vitest/tree/main/examples)
- **Workflow Tools**
  - [changesets](https://github.com/changesets/changesets)
  - [verdaccio](https://verdaccio.org/)
- **Infrastructure and Backend** I'm exploring backend technologies and architecture, but this site does not use a backend server besides what is provided by [SvelteKit](https://kit.svelte.dev/)
