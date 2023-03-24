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

## TODO

There is still a lot of work in progress:

TODO: CSS

- Improve color workflow and design
  - Create thoughtful color system
  - Improve css vars color system
- Design + dev: `transitions.scss` and `motion.scss`
- I'd like to output CSS files and load `block/*.css` to corresponding `block/*.svelte` components in Svelte library (for now all css is global as I concentrated on the content of the css rather than its loading mechanism)
- Post css cleanup and Stylelint
- Consider integrating [Jit Props](https://github.com/GoogleChromeLabs/postcss-jit-props) to lighten the CSS load
- _Use_ these new CSS tooling to experiment with design !
- Improve this README
- Create color contrast pairs, investigate color functions
- Font loading strategy (for some interesting pointers see: https://www.zachleat.com/web/css-tricks-web-fonts/)
