# E2E Tests

## Requirements

First, to setup Playwright testing tools for a Svelte library components, please follow the instructions here:

- [Playwright Doc - Testing Components](https://playwright.dev/docs/test-components)

In this project, use the `pnpm` versions of all commands

## Getting started

On successful completion of the playwright testing setup, you should see:

```shell
✔ Success! Created a Playwright Test project at `[project-root]`

Inside that directory, you can run several commands:

  pnpm run test-ct
    Runs the component tests.

  pnpm run test-ct -- --project=chromium
    Runs the tests only on Desktop Chrome.

  pnpm run test-ct App.test.ts
    Runs the tests in the specific file.

  pnpm run test-ct -- --debug
    Runs the tests in debug mode.

We suggest that you begin by typing:

  pnpm run test-ct

Visit https://playwright.dev/docs/intro for more information. ✨

Happy hacking! 🎭
```

NOTE There is no script to run component tests in package.json: just run:

```shell
pnpm build && pnpm run test-ct
```

[TODO] Continue README
