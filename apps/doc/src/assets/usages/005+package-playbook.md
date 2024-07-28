---
title: 'Playbook'
date: '2024-07-27'
updated: null
slug: playbook
asset: package-playbook
id: '005'
tags: ['example', 'doc', 'playbook', 'packages', 'wip']
---

## Contents

This package is used to render the documentation and interactive demos of the UI library

### Requirements

- [Svelte](https://svelte.dev/)
- [@fat-fuzzy/style](https://github.com/fat-fuzzy/rocks/tree/main/packages/style)
- [@fat-fuzzy/ui](https://github.com/fat-fuzzy/rocks/tree/main/packages/ui)

### Usage

1. Install the package as a `devDependency`:

```shell
pnpm i -D @fat-fuzzy/playbook
```

Build the routing structure using this example: [@fat-fuzzy/doc UI route](https://github.com/fat-fuzzy/rocks/tree/main/apps/doc/src/routes/ui)

The structure assumes you have a UI library that exports components grouped into five `StyleFamily` constants:

- tokens
- blocks
- layouts
- recipes

You can see how this is done for the UI library package: [@fat-fuzzy/ui library exports](https://github.com/fat-fuzzy/rocks/blob/main/packages/ui/src/lib/index.ts)

The components will be rendered using the props that are declared in its corresponding markdown asset, which must be included in the `src/assets/ui` folder of the doc website.

Here is what that looks like for the UI library in this site: [UI Library Markdown assets](https://github.com/fat-fuzzy/rocks/tree/main/apps/doc/src/assets/ui)

[TODO] Elaborate on how this thing was built

## Resources

- [@fat-fuzzy/ui](https://github.com/fat-fuzzy/rocks/tree/main/packages/ui)

You can see how this package renders the UI library doc here: [UI](/ui)
