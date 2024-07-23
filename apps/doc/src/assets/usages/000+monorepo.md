---
title: Monorepo
date: '2024-07-21'
updated: '2023-07-23'
slug: monorepo
id: '000'
tags: ['example', 'doc', 'monorepo', 'wip']
---

## Architecture

The initial motivation for this monorepo setup was usage of [pnpm](https://pnpm.io/) and [Turborepo's workspaces conventions](https://turbo.build/repo/docs/getting-started/existing-monorepo#configure-workspaces).

It evolves when necessary.

### Stack

The main technologies I use to build this project are HTML, CSS, Svelte (with TypeScript), and Markdown.
I also add the WebGL shaders I write as I continue to learn, and might add a backend at some point.

### Packages Overview

The repository is organized into three workspaces:

- **apps** : contains client facing code, organized by project
  - **doc** : This site!
- **infra** : contains infrastructure code
  - This is WIP and in private repos for the moment
- **packages** : contains UI, web graphics, logic and experiments libraries, as well as common config

You can learn more about individual packages in the [Packages](/doc/usage/packages) section.

## Requirements

- [Node.js](https://nodejs.org/en)
- The UI library has recently been upgraded to [Svelte 5](https://svelte-5-preview.vercel.app/docs/introduction)

🚧 This is work in progress

- Test runner [Vitest](https://vitest.dev/)

  - [Examples](https://github.com/vitest-dev/vitest/tree/main/examples)

- Code / Env

  - [docker](https://www.docker.com/)
  - [changesets](https://github.com/changesets/changesets)
  - [verdaccio](https://verdaccio.org/)

## Resources

Using a private NPM Registry: Verdaccio

- Install verdaccio: [Verdaccio Doc - Installation](https://verdaccio.org/docs/installation)
- Launch the private registry with the command: `verdaccio`
- To publish a package to the private registry, run the following command in the package's root directory:

  ```shell
  pnpm publish --registry http://localhost:4873
  ```

- Use the package in another repository that has access to the private registry:

  ```shell
  pnpm i --registry http://localhost:4873
  ```
