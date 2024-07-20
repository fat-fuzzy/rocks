# 👾 ✨ Fat Fuzzy Rocks 🫧 🐙

This repository contains learning notes, tools, and experiments.
Much of the work is based on examples and projects made by others: I try to make attributions clear in the code and docs, and while I am at it, thank you !

## Contents

Below is a rough attempt at categorizing the contents of this repo.

- **Tools** Tools aim to provide solutions to quickly bootstrap new (web) applications.
- **Playgrounds** Playgrounds are projects I use to learn, play, and experiment.
- **Doc** Self explanatory, these are projects where I document what I learn and the tools I make so I can understand what I was doing back then, how it may be useful now, and things that need improvement.

## Packages Overview

The repository is organized into three workspaces:

- **apps** contains client facing code, organized by project
  - **doc** The doc website for this project, accessible here:  [Fat Fuzzy Rocks](https://rocks.pages.dev/)
- **infra** contains infrastructure code
  - This is WIP and in private repos for the moment
- **packages** contains UI, web graphics, logic and experiments libraries, as well as common config

  - **config** common config (eslint, prettier, cz-conventional-commit _slightly_ custom lib)
  - **git-poule** a tool to extract commit data
  - **lib** Libraries unrelated to building an interface or utility functions: logic and experiments
    - 👾 gfx - everything related to working with webgl
    - 🤖 state machines
    - ➕ maths
  - **markdown** A utility package for loading markdown files
    - based on [bluwy website markdown package](https://github.com/bluwy/website/tree/master/packages/markdown)
  - **playbook** a package used to display, document and test the **ui** and **style** packages
  - **style** a CSS library
  - **sketch** a package used to display and handle interactive web graphics programs (used for learning: this usage is one of the main motivations for the Fat Fuzzy Rocks project!)
  - **ui** A frontend component library (Svelte 4):
    - A UI library that can be used as a common source of truth for web projects
    - this is the initial component library I created in Svelte, and it contains the initial logic for the **playbook**,  **style**, and **sketch** packages
  - **ui-s5** A frontend component library (Svelte 5):
    - A UI library that can be used as a common source of truth for web projects
    - I reduced the UI library to a set of components that can be shared across sites, and extracted the logic of the **playbook**,  **style**, and **sketch** interfaces into their own packages

---

The initial motivation for this setup was usage of [Turborepo's workspaces conventions](https://turbo.build/repo/docs/getting-started/existing-monorepo#configure-workspaces). It evolves when necessary.

## Usage

The packages in this repo can be used together or independently, depending on the use case.
For example, I use the package `packages/ui` to build frontends in other contexts:

- on a Django app and in a Jupyter Notebook (currently on a private repo)
- in the `apps/doc` and `apps/play` packages in this repo

The `package/lib/gfx` package feeds the `apps/play` package as well as a component demo in `apps/doc`.

I'm experimenting with data analysis and learning R: I built the `packages/git-poule` script because I wanted to analyze the work done in this repo (the idea came as I was trying to estimate some work). I figured I could use that data as material for my learning, and maybe gain insights to guide future work while at it.

I chose to put all these things in one repository for convenience, to centralize notes and shared libraries.

## 🚧 WIP

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

## Licenses

This repository uses the following license:

MIT

The packages, folders and files it contains may have different licenses:

- MIT
- Apache-2.0
- BSD-3-Clause
- Custom licenses
