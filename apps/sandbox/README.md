# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Migration guide

For migrating to the release candidate version (living on the edge version), follow this [migration guide](https://github.com/sveltejs/kit/discussions/5774)

in pnpm, start by:

```bash
pnpm dlx svelte-migrate routes
```

Then:

```bash
1: git commit -m "svelte-migrate: renamed files"
2: Review the migration guide at https://github.com/sveltejs/kit/discussions/5774
3: Search codebase for "@migration" and manually complete migration tasks
4: git add -A
5: git commit -m "svelte-migrate: updated files"
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
