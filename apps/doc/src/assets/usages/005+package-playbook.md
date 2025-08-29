---
title: 'Playbook'
date_created: '2024-07-27'
date_updated: '2024-07-27'
slug: playbook
asset: package-playbook
id: '005'
tags: ['example', 'doc', 'playbook', 'packages', 'wip']
---

## Contents

This package is used to render the documentation and interactive demos of the UI library.

You can see how that renders here: [UI](/ui)

### Requirements

- [Svelte](https://svelte.dev/)
- [@fat-fuzzy/style](https://github.com/fat-fuzzy/rocks/tree/main/packages/style)
- [@fat-fuzzy/ui](https://github.com/fat-fuzzy/rocks/tree/main/packages/ui)

### Usage

Install the package as a `devDependency`:

```shell
pnpm i -D @fat-fuzzy/playbook
```

### UI Library requirements

The `Playground` component assumes that the UI library exports components grouped into five objects:

- `tokens`
- `blocks`
- `layouts`
- `recipes`
- `raw`

You can see how this is done for the UI library package: [exports from @fat-fuzzy/ui](https://github.com/fat-fuzzy/rocks/blob/main/packages/ui/src/lib/index.ts)

### Building the pages

Build the routing structure using this example: [UI route for @fat-fuzzy/doc](https://github.com/fat-fuzzy/rocks/tree/main/apps/doc/src/routes/(rails)/ui)

### Providing content

The components' documentation content comes from their corresponding markdown assets, which must be located in the `src/assets/ui` folder of the doc website (assuming `ui` is the name of the route used to render the demo).

The markdown also provides the metadata necessary to render the inputs for the style props required by the element.

Here is what that looks like for the UI library in this site: [UI Library Markdown assets](https://github.com/fat-fuzzy/rocks/tree/main/apps/doc/src/assets/ui)

[TODO] Elaborate on how this thing was built and how it works

## Resources

- [@fat-fuzzy/ui](https://github.com/fat-fuzzy/rocks/tree/main/packages/ui)
