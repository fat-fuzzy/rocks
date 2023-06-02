# 🪨 👾 ✨ Fat Fuzzy Rocks 🫧 🐙 🪨

This project aims to:

- provide a way to quickly bootstrap new web applications (websites or other types)
- be a learning resource

## Overview

This repository is organized into three workspaces:

<details>
<summary><b>apps</b> contains client facing code, organized by project</summary>
<p>

- **doc** The documentation website for this project
  - It's accessible here: https://rocks.pages.dev/
- **sandbox** A frontend sample app app that uses the **ui** library package
  - Used fot testing and experimentation

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
<summary><b>packages</b> contains logic, UI and web graphics libraries, as well as common config</summary>
<p>

- **config** Common config: eslint, etc

  The monorepo needs some adjustments as .prettier config is currently duplicated in projects: I believe need to solve a problem specific to my workspace config in VSCode to fix this easily - WIP

- **design** a design sandbox
  - isolates design work from the UI library
  - design assets and collections go here
  - design tests and experiments go here
- **lib** Libraries unrelated to building an interface or utility functions: logic and experiments

  - 👾 gfx - everything related to working with webgl
  - 🤖 state machines
  - ➕ maths

- **markdown** A utility package for loading markdown files

  - based on [bluwy/website/packages](https://github.com/bluwy/website/tree/master/packagess)

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

- [Vitest](https://vitest.dev/)
- [Testing library](https://github.com/testing-library)
- [Playwright](https://playwright.dev/)

### Maintenance

- Monorepo
  - [pnpm](https://pnpm.io/)
  - [Turborepo](https://turbo.build/)
- Code / Env
  - [docker](https://www.docker.com/) - 🚧 WIP
  - [changesets](https://github.com/changesets/changesets) - 🚧 WIP
  - [commitizen](https://github.com/commitizen/cz-cli) - 🚧 WIP
  - TODO
    - [verdaccio](https://verdaccio.org/)
    - [stylelint](https://stylelint.io/)

## Licenses

This repository uses the following license:

MIT

The packages, folders and files it contains may have different licenses:

- MIT
- Apache-2.0
- Custom licenses
