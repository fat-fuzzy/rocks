# 🪨 Fat Fuzzy Rocks 🪨

This project is a way to scratch my own itch:

- help me bootstrap new web applications (websites or other types)
- have a reliable UI library I can re-use as a source of truth common to my web projects
- keep track of new ideas and setup capabilities (back/front/design) as I go along

Ideally, this starter kit will meet the following requirements:

- [x] integrates a design workflow
- [x] is flexible
- [ ] is efficiently documented
- [ ] is well tested and easily testable
- [ ] has a low maintenance cost

## Packages

- **api** API code
- **client** frontend application structure
- **ui** frontend component library
- **design** design tokens and other relevant design resources
- **doc** decisions, UI library doc, other doc-worthy information
- **resources** backend resources (database, auth, storage, etc)
- **lib** libraries unrelated to building an interface or accessing backend resources (logic and experiments)

### 🚧 WIP - Package Details

- **doc**
  - Decisions (architecture, tech, etc)
  - UI library
  - User doc where necessary
- **design**
  Tools & Resources:
  - Style dictionary:
    - https://amzn.github.io/style-dictionary/#/
    - https://www.michaelmang.dev/blog/managing-and-exporting-design-tokens-with-style-dictionary
  - Open Props
    - https://open-props.style/
  - SASS:
    - https://sass-lang.com/
    - https://www.alwaystwisted.com/articles/creating-utility-classes-with-design-tokens-using-sass
  - Design System
    - https://open-ui.org/
    - https://every-layout.dev/blog/algorithmic-design/
    - https://inclusivedesignprinciples.org/
    - https://inclusive-components.design/
    - https://tink.uk/accessible-svg-line-graphs/
- **lib**
  - 👾 gl
  - 🤖 state machines
    - https://xstate.js.org/docs/
    - https://github.com/statelyai/xstate
    - https://github.com/statelyai/xstate/tree/main/packages/xstate-svelte
    - https://github.com/kenkunz/svelte-fsm
    - https://statecharts.dev/
    - https://stately.ai/registry/new
  - ➕ maths

## 🚧 WIP - Testing

- https://github.com/testing-library/dom-testing-library
- https://playwright.dev/
- https://www.cypress.io/

## 🚧 WIP - Maintenance

- Monorepo
  - https://pnpm.io/
- Code / Env
  - https://github.com/commitizen/cz-cli
  - https://verdaccio.org/
  - https://www.docker.com/
