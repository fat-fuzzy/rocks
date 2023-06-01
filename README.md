# 🪨 👾 ✨ Fat Fuzzy Rocks 🫧 🐙 🪨

This project aims to:

- provide a way to quickly bootstrap new web applications (websites or other types)
- be a learning resource

Ideally, this project will:

- [x] integrate a design workflow
- [x] be flexible
- [ ] be efficiently documented
- [ ] be well tested and easily testable
- [ ] have a low maintenance cost

## Getting started

This repository contains several packages, which can be used together or independently, depending on the use case.

### Use cases

🚧 WIP: doc/usage

## Overview

This repository is organized into three workspaces:

- **apps** for client facing code, organized by project
- **packages** for backend logic, UI and web graphics libraries, as well as common config
- **infra** for infrastructure code
  - WIP: Resources (database, auth, storage, etc)

The initial motivation for this setup was usage of [Turborepo's workspaces conventions](https://turbo.build/repo/docs/getting-started/existing-monorepo#configure-workspaces). It will evolve when necessary.

### Apps

- **doc** This app is a the documentation website for this project
  - It's accessible here: https://rocks.pages.dev/
- **sandbox** A frontend sample app app that uses the **ui** library package
  - Used fot testing and experimentation

### Packages

- **api** API packages
- **config** Common config (eslint, etc)
  - THe monorepo needs some adjustments as .prettier config is currently duplicated in projects: I believe need to solve a problem specific to my workspace config in VSCode to fix this easily - WIP
- **design** A place to make design experiments and decisions
  - use this package to isolate design work from the UI library
  - test designs here: if the pattern can be re-used, _then_ consider migrating it as a component in the UI library
  - design assets and collections go here
- **lib** Libraries unrelated to building an interface or accessing backend resources (logic and experiments)
  - 👾 gfx - everything related to working with webgl
  - 🤖 state machines
  - ➕ maths
    These libraries are generally always WIP unless specifically stated
- **ui** A frontend component library
  - A UI library that can be used as a common source of truth for web projects

## Testing

🚧 WIP

- [Vitest](https://vitest.dev/)
- [Testing library](https://github.com/testing-library)
- [Playwright](https://playwright.dev/)

## Maintenance

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
