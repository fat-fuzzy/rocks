# Fat Fuzzy UI

Fat Fuzzy UI is a component library that aims to maximize use HTML and CSS's native
capabilities to produce harmonious and robust designs.

The components are built using [SASS](https://sass-lang.com/), [Svelte](https://svelte.dev) and [SvelteKit]("https://kit.svelte.dev/), and the structure of the library as well as the way the components are designed are based on the ideas put forth in [Algorithmic Design](https://every-layout.dev/blog/algorithmic-design/) and [CUBE CSS](https://cube.fyi/).

## Tools & Resources

### Svelte libraries

Resources for building a blog site using Svelte and SvelteKit

- [mdsvex](https://mdsvex.pngwn.io/)
- [bluwy/website](https://github.com/bluwy/website)
- [SvelteKit MDsvex Blog Starter](https://github.com/rodneylab/sveltekit-blog-mdx)

### Front End Testing

🚧 WIP

- Test runner [Vitest](https://vitest.dev/)
  - [Svelte example](https://github.com/vitest-dev/vitest/tree/main/examples/svelte)
  - [Playwright example](https://github.com/vitest-dev/vitest/tree/main/examples/playwright)
- [DOM Testing Library](https://github.com/testing-library/dom-testing-library)
- E2E tests [Playwright](https://playwright.dev/)

### Design System

- [CUBE CSS](https://cube.fyi)
- [Open UI](https://open-ui.org/)
- [Every Layout blog post on Algorithmic design](https://every-layout.dev/blog/algorithmic-design/)
- [Inclusive design principles](https://inclusivedesignprinciples.org/)
- [Inclusive componenets](https://inclusive-components.design/)
- [Accessible SVG](https://tink.uk/accessible-svg-line-graphs/)

### Design Tokens

- [Creating utility classes with design tokens using SASS](https://www.alwaystwisted.com/articles/creating-utility-classes-with-design-tokens-using-sass)
- [Style Dictionary](https://amzn.github.io/style-dictionary/)
  - [Managing and Exporting design tokens with style dictionary](https://www.michaelmang.dev/blog/managing-and-exporting-design-tokens-with-style-dictionary)
- [Open Props](https://open-props.style/)

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev -- --open
```

## Building

To create a production version of your app:

```bash
pnpm build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
