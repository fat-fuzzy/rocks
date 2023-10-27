# 🪨 👾 ✨ Fat Fuzzy Rocks 🫧 🐙 🪨

This project aims to:

- provide a way to quickly bootstrap new web applications (websites or other types)
- be a learning resource

## Overview

This repository is organized into three workspaces:

<details>
<summary><b>apps</b> contains client facing code, organized by project</summary>
<p>

- **doc** The documentation website for this project, accessible here: https://rocks.pages.dev/
- **play** A playground for web graphics experiments

</p></details>

<details>
<summary><b>infra</b> contains infrastructure code</summary>
<p>

Common resources

- **scripts**
  - WIP

Resources per app

- **doc**

  - WIP

</p></details>

<details>
<summary><b>packages</b> contains UI, web graphics, logic and experiments libraries, as well as common config</summary>
<p>

- **config** common config (eslint, prettier, cz-conventional-commit _slightly_ custom lib)

TODO:
The monorepo needs some cleanup: `.prettier` config is currently duplicated in projects. I think I need to solve a problem specific to my workspace config in VSCode to fix this easily

- **design** a design sandbox
  - isolates design work from the UI library
  - design assets and collections go here
  - design tests and experiments go here
- **lib** Libraries unrelated to building an interface or utility functions: logic and experiments

  - 👾 gfx - everything related to working with webgl
  - 🤖 state machines
  - ➕ maths

- **markdown** A utility package for loading markdown files

  - based on [bluwy website markdown package](https://github.com/bluwy/website/tree/master/packages/markdown)

- **ui** A frontend component library
  - A UI library that can be used as a common source of truth for web projects

</p></details>

---

The initial motivation for this setup was usage of [Turborepo's workspaces conventions](https://turbo.build/repo/docs/getting-started/existing-monorepo#configure-workspaces). It evolves when necessary.

## Use cases

🚧 WIP: doc/usage

## Getting started

This repository contains several packages, which can be used together or independently, depending on the use case.

### Testing

🚧 WIP

- Test runner [Vitest](https://vitest.dev/)
  - [Examples](https://github.com/vitest-dev/vitest/tree/main/examples)

### Repository Tools

- Monorepo

  - [pnpm](https://pnpm.io/)
  - [Turborepo](https://turbo.build/)

- Code / Env

  - [stylelint](https://stylelint.io/)
  - [commitizen](https://github.com/commitizen/cz-cli)

- 🚧 WIP

  - [docker](https://www.docker.com/)
  - [changesets](https://github.com/changesets/changesets)
  - [verdaccio](https://verdaccio.org/)

    - Install verdaccio: https://verdaccio.org/docs/installation
    - Using a verdaccio private registry:

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
- Custom licenses
