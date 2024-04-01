# CSS Library

The work in this library is based on the ideas put forth in the following resources:

- [CUBE CSS](https://cube.fyi)
- [Every Layout blog post on Algorithmic design](https://every-layout.dev/blog/algorithmic-design/)
- [Every Layout](https://every-layout.dev)
- [Grid by Example](https://gridbyexample.com/)
- [UTOPIA](https://utopia.fyi/)
- [Inclusive design principles](https://inclusivedesignprinciples.org/)
- [Inclusive components](https://inclusive-components.design/)
- [Open Props](https://open-props.style/)

## DONE

- Export CSS library: `@fat-fuzzy/ui/csscore` and `@fat-fuzzy/ui/csstokens`
- Postcss: added dependency, integrated into workflow

## WIP

- Postcss:

  - environments DEV/PROD
  - [stylelint](https://stylelint.io/)
    - Style lint rules are defined in `ui/.stylelintrc.json`
    - NOTE: the following rules have issues:
      - `scss/operator-no-unspaced` : throws 10 false positives in `src/lib/styles/scss/tokens/layout.scss`
      - `function-name-case` : this rule is set to `null` to allow use of `RGBA` function using modern color function notation
      - `scss/load-no-partial-leading-underscore` : this rule is set to `null` to allow `@forward` of `[*]/_index.scss` files in `scss/core/index.scss`
  - [Jit Props](https://github.com/GoogleChromeLabs/postcss-jit-props)
  - minification (or use rollup terser?)

- CSS library:
  - cleanup props / UI api inputs

## TODO: CSS

- CSS library:
  - export styles per component (bundle with component / css prioritization)
  - color management system:
    - improve css vars
    - use color functions (palette generation, a11y testing)
    - create color contrast pairs
  - design tokens naming strategy
  - add layouts
  - design tokens doc
  - usage doc
- Improve design workflow
  - 💡 Design viewer app ?
- Design + dev:
  - `transitions.scss` and `motion.scss`
  - Font loading strategy (for some interesting pointers see: <https://www.zachleat.com/web/css-tricks-web-fonts/>)
  - color palettes
- _Use_ these new CSS tooling to experiment with design !
- Improve this README
