# CSS Library

The work in this library is based on the ideas put forth in the following resources:

- [CUBE CSS](https://cube.fyi)
- [Every Layout](https://every-layout.dev)
- [UTOPIA](https://utopia.fyi/)
- [Inclusive design principles](https://inclusivedesignprinciples.org/)
- [Inclusive components](https://inclusive-components.design/)
- [Open Props](https://open-props.style/)

I particularly recommend reading this open access blog post on algorithmic design to get an understanding what this CSS library is aiming for:

- [Every Layout blog post on Algorithmic design](https://every-layout.dev/blog/algorithmic-design/)

## DONE

- Export CSS library: `@fat-fuzzy/ui/csscore` and `@fat-fuzzy/ui/csstokens`
- Postcss: added dependency, integrated into workflow

## WIP

- Postcss:

  - environments DEV/PROD
  - [stylelint](https://stylelint.io/)
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
  - Font loading strategy (for some interesting pointers see: https://www.zachleat.com/web/css-tricks-web-fonts/)
  - color palettes
- _Use_ these new CSS tooling to experiment with design !
- Improve this README
