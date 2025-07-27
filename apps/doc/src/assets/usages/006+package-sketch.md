---
title: 'Sketch'
date_created: '2024-07-27'
date_updated: '2024-07-27'
slug: sketch
asset: package-sketch
id: '006'
tags: ['example', 'doc', 'sketch', 'packages', 'wip']
---

## Motivation

As I began learning WebGL, I wished to have a way to easily setup the interfaces that I need to display graphics programs and interact with the canvas.

After [some](https://github.com/patiboh/fuzzy-playground) [rounds](https://github.com/fat-fuzzy/playground) of [iteration](https://github.com/fat-fuzzy/rocks/tree/bd3b697dd999432835dde06e25d4813a1ebc3dfe/packages/ui-s4/src/lib/components/graphics), I managed to build a small library that I enjoyed working with: [@fat-fuzzy/sketch](https://github.com/fat-fuzzy/rocks/tree/main/packages/sketch).

## Contents

This package is used in conjunction with the [@fat-fuzzy/gfx](https://github.com/fat-fuzzy/rocks/tree/main/packages/gfx) package to display graphics programs.

### Requirements

- [Svelte](https://svelte.dev/)
- [@fat-fuzzy/style](https://github.com/fat-fuzzy/rocks/tree/main/packages/style)
- [@fat-fuzzy/ui](https://github.com/fat-fuzzy/rocks/tree/main/packages/ui)
- [@fat-fuzzy/gfx](https://github.com/fat-fuzzy/rocks/tree/main/packages/gfx)

### Usage

Install the package as a `devDependency`:

```shell
pnpm i -D @fat-fuzzy/sketch
```

Use it in conjunction with the [`@fat-fuzzy/gfx`](https://github.com/fat-fuzzy/rocks/tree/main/packages/gfx) package as documented in the [Usage | GFX](/doc/usage/gfx) page.

You can see how the interface is rendered in the [PLAY](/play) page's sketches.
