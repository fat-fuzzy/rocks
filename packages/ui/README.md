# Style

You can read the documentation for this package here: [Fat Fuzzy Usage | Style](https://rocks.pages.dev/doc/usage/ui)

Read more about creating a library [in the Svelte docs](https://kit.svelte.dev/docs/packaging).

## Developing

Once you've created a project and installed dependencies with `pnpm install` (or `npm install` or `yarn`), start a development server:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

Everything inside `src/lib` is part of your library, everything inside `src/routes` can be used as a showcase or preview app.

## Building

To build your library:

```bash
pnpm run package
```

To create a production version of your showcase app:

```bash
pnpm run build
```

You can preview the production build with `pnpm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Publishing

To publish your library to [pnpm](https://www.npmjs.com):

```bash
pnpm publish
```
