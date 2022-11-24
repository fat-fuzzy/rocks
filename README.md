# ✨ 👾 🪨 Fat Fuzzy Rocks 🪨 🐙 🌊

This project aims to:

- provide a way to quickly bootstrap new web applications (websites or other types)
- be a learning resource

Ideally, this project will meet the following requirements:

- [x] integrate a design workflow
- [x] be flexible
- [ ] be efficiently documented
- [ ] be well tested and easily testable
- [ ] have a low maintenance cost

## 🚧 WIP - Packages

- **api** API code
- **client** frontend application structure
- **ui** A frontend component library
  - A reliable UI library that can be used as a common source of truth for web projects
- **design** A place to make design experiments and decisions
  - use this package to isolate design work from the UI library
  - test designs here: if the pattern can be re-used, _then_ consider migrating it as a component in the UI library
  - design assets and colletions go here
- **doc** A place doc-worthy information such as:
  - User doc
  - UI library doc
  - new ideas and foundational decisions (architecture, tech, etc)
  - setup capabilities (back, front, design, etc)
- **lib** libraries unrelated to building an interface or accessing backend resources (logic and experiments)
  - 👾 gl - everything related to working with webgl
  - 🤖 state machines
  - ➕ maths
- **resources** backend resources (database, auth, storage, etc)

## 🚧 WIP - Testing

- [DOM testing library](https://github.com/testing-library/dom-testing-library)
- [Playright](https://playwright.dev/)
- [Cypress](https://www.cypress.io/)

## 🚧 WIP - Maintenance

- Monorepo
  - [pnpm](https://pnpm.io/)
- Code / Env
  - [comitizen](https://github.com/commitizen/cz-cli)
  - [verdaccio](https://verdaccio.org/)
  - [docker](https://www.docker.com/)

### Tools & Resources

- **design**

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

- **lib**
  - 👾 gl - everything related to working with webgl
    - [MDN WebGL API Doc](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
    - [WebGL Fundamentals](https://webglfundamentals.org/)
    - [WebGL Fundamentals - 2](https://webgl2fundamentals.org/)
    - [The Book of Shaders](https://thebookofshaders.com/)
    - [Inigo Quilez](https://iquilezles.org/)
    - [Learn WebGL](https://learnwebgl.brown37.net/index.html)
    - [Introduction to computer graphics](https://math.hws.edu/graphicsbook/index.html)
    - [Introduction to WebGL](https://dev.opera.com/articles/introduction-to-webgl-part-1/)
  - 🤖 state machines
    - [XState Doc](https://xstate.js.org/docs/)
    - [XState visual Editor](https://stately.ai/registry/new)
    - [xstate GitHub](https://github.com/statelyai/xstate)
    - [xstate-svelte GitHub](https://github.com/statelyai/xstate/tree/main/packages/xstate-svelte)
    - [svelte-fsm GitHub](https://github.com/kenkunz/svelte-fsm)
    - [Statecharts Doc](https://statecharts.dev/)
  - ➕ maths
    - [minimath](https://github.com/patiboh/minimath)
