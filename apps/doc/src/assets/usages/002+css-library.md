---
title: CSS Library
date: '2024-07-27'
updated: null
slug: css-library
id: '002'
tags: ['example', 'doc', 'css', 'wip']
---

## Contents

This is essentially an opinionated CSS library packaged as an npm module.
The package's exports are:

- a minified `index.css`
- a prettified, fully concatenated `main.css` stylesheet
- individual stylesheets under `css/**`

## Requirements

None besides a Node.js environment and a `package.json`

## 🚧 Getting started

1. Install the package as a `devDependency`:

 ```shell
 pnpm i -D @fat-fuzzy/style
 ```

1. Then:

 Import the full minified CSS using JavaScript, for example in `+layout.svelte`:

 ```js
 import '@fat-fuzzy/style'
 ```

 [WIP] or import the individual stylesheets into your components (recommended usage for a component library)

 ```js
 import '@fat-fuzzy/style/css/blocks/button.css'
 ```

 [WIP]  or link to the files in a Django template

 ```html
 <link href="{% static 'styles/css/main.css' %}"
  rel="stylesheet"
  type="text/css">
 ```

## 🚧 Resources

- [CUBE CSS](https://cube.fyi/)
- [Open Props](https://open-props.style/)

## TODO

- optimize CSS loading strategy
- load custom design tokens
- CSS library:
  - a11y testing
  - design tokens doc
- Improve design workflow: 💡 Design viewer app ?
- Design + dev:
  - `transitions.scss` and `motion.scss`
  - Font loading strategy (for some interesting pointers see [this article on Web Fonts](https://www.zachleat.com/web/css-tricks-web-fonts/))
- Postcss:
  - environments DEV/PROD
  - [stylelint](https://stylelint.io/)
    - Style lint rules are defined in `ui/.stylelintrc.json`
    - NOTE: the following rules have issues:
      - `scss/operator-no-unspaced` : throws 10 false positives in `src/lib/styles/scss/tokens/layout.scss`
      - `function-name-case` : this rule is set to `null` to allow use of `RGBA` function using modern color function notation
      - `scss/load-no-partial-leading-underscore` : this rule is set to `null` to allow `@forward` of `[*]/_index.scss` files in `scss/core/index.scss`
  - [Jit Props](https://github.com/GoogleChromeLabs/postcss-jit-props)
