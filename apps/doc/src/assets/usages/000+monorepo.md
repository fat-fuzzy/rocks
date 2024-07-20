---
title: Monorepo
date: '2024-07-21'
slug: monorepo
id: '000'
tags: ['example', 'doc', 'monorepo', 'wip']
---

## Architecture

The initial motivation for this setup was usage of [Turborepo's workspaces conventions](https://turbo.build/repo/docs/getting-started/existing-monorepo#configure-workspaces).

It evolves when necessary.

### Packages Overview

The repository is organized into three workspaces:

- **apps** : contains client facing code, organized by project
  - **doc** : This site!
- **infra** : contains infrastructure code
  - This is WIP and in private repos for the moment
- **packages** : contains UI, web graphics, logic and experiments libraries, as well as common config

## Usage

The packages in this repo can be used together or independently, depending on the use case.
For example, the package `packages/ui` can be used to build apps in different contexts:

- on a Django app and in a Jupyter Notebook (currently working on a private repo)
- this documentation is built using the following packages: `style`, `ui-s5`, `playbook` and `sketch`

The package `lib/gfx` package is a package that I use to learn web graphics.

I'm experimenting with data analysis and learning R: I built the `packages/git-poule` script to analyze the work done in this repo. I figured I could use that data as material for my learning, and maybe gain insights to guide future work while at it.

I chose to put all these things in one repository for convenience, to centralize notes and shared libraries.

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
