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

## Monorepo overview

This repository is organized into two package types following [Turborepo's workspaces conventions](https://turbo.build/repo/docs/getting-started/existing-monorepo#configure-workspaces)

### Packages

- **api** API code
  - WIP
- **ui** A frontend component library
  - A reliable UI library that can be used as a common source of truth for web projects
- **design** A place to make design experiments and decisions
  - use this package to isolate design work from the UI library
  - test designs here: if the pattern can be re-used, _then_ consider migrating it as a component in the UI library
  - design assets and collections go here
- **lib** Libraries unrelated to building an interface or accessing backend resources (logic and experiments)
  - 👾 gfx - everything related to working with webgl
  - 🤖 state machines
  - ➕ maths
    These libraries are generally always WIP unless specifically stated
- **resources** Backend resources (database, auth, storage, etc)
  - WIP

### Apps

- **doc** A place for doc-worthy information such as:

  - User doc
  - **ui** library doc
  - new ideas and foundational decisions (architecture, tech, etc)
  - setup capabilities (back, front, design, etc)

  This app is a website that uses and documents the **ui** library package

- **client** A frontend application example that uses the **ui** library package
  - WIP

## 🚧 WIP - Testing

- [Testing library](https://github.com/testing-library)
- [Playwright](https://playwright.dev/)

## 🚧 WIP - Maintenance

- Monorepo
  - [pnpm](https://pnpm.io/)
  - [Turborepo](https://turbo.build/)
- Code / Env
  - WIP
    - [docker](https://www.docker.com/)
    - [verdaccio](https://verdaccio.org/)
  - TODO
    - [changesets](https://github.com/changesets/changesets)
    - [commitizen](https://github.com/commitizen/cz-cli)
    - [stylelint](https://stylelint.io/)

## 🚧 WIP - Licenses

[TODO] Detail Licenses per package

This repository uses the following license:

MIT

The packages, folders and files it contains may have different licenses:

- MIT
- Apache-2.0
- Custom licenses

## Tools & Resources

### Svelte libraries

Resources for building a blog site using Svelte and SvelteKit

- [mdsvex](https://mdsvex.pngwn.io/)
- [bluwy/website](https://github.com/bluwy/website)
- [SvelteKit MDsvex Blog Starter](https://github.com/rodneylab/sveltekit-blog-mdx)

### Design System

- Design System
  - [CUBE CSS](https://cube.fyi)
  - [Open UI](https://open-ui.org/)
  - [Every Layout blog post on Algorithmic design](https://every-layout.dev/blog/algorithmic-design/)
  - [Inclusive design principles](https://inclusivedesignprinciples.org/)
  - [Inclusive componenets](https://inclusive-components.design/)
  - [Accessible SVG](https://tink.uk/accessible-svg-line-graphs/)
- [SASS](https://sass-lang.com/)
  - [Creating utility classes with design tokens using SASS](https://www.alwaystwisted.com/articles/creating-utility-classes-with-design-tokens-using-sass)
- [Style Dictionary](https://amzn.github.io/style-dictionary/)
  - [Managing and Exporting design tokens with style dictionary](https://www.michaelmang.dev/blog/managing-and-exporting-design-tokens-with-style-dictionary)
- [Open Props](https://open-props.style/)

### Graphics

- 👾 Everything related to working with webgl
  - [MDN WebGL API Doc](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
  - [WebGL Fundamentals](https://webglfundamentals.org/)
  - [WebGL Fundamentals - 2](https://webgl2fundamentals.org/)
  - [The Book of Shaders](https://thebookofshaders.com/)
  - [Inigo Quilez](https://iquilezles.org/)
  - [Learn WebGL](https://learnwebgl.brown37.net/index.html)
  - [Introduction to computer graphics](https://math.hws.edu/graphicsbook/index.html)
  - [Introduction to WebGL](https://dev.opera.com/articles/introduction-to-webgl-part-1/)

### State Machines

- [XState Doc](https://xstate.js.org/docs/)
- [XState visual Editor](https://stately.ai/registry/new)
- [xstate GitHub](https://github.com/statelyai/xstate)
- [xstate-svelte](https://github.com/statelyai/xstate/tree/main/packages/xstate-svelte)
- [svelte-fsm](https://github.com/kenkunz/svelte-fsm)
- [Statecharts Doc](https://statecharts.dev/)

### Maths

WIP

- ➕ maths
  - [minimath](https://github.com/patiboh/minimath)
