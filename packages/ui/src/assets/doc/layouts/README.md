---
title: Layouts
slug: layouts
tags: ['layouts']
inputs: ['layouts.container', 'layouts.element']
context: ['app.settings']
---

## What are Layouts ?

In [CUBE CSS](https://cube.fyi), `Layouts` are [compositions](https://cube.fyi/composition.html). This means that `Layouts` are components used to structure and organize the content and interface elements it contains.

These `Layouts` are largely based on the teachings and examples put forth in [every-layout.dev](https://every-layout.dev/), and aim to use minimal HTML markup and carefully written CSS to work in harmony with the browsers's layout algorithms.

`Layouts` are designed to be combined with `Blocks` and other `Layouts` to create new components that maintain the characteristics defined in the design system's `Tokens`.

`Containers` are a type of `Layout` that limit the amount of horizontal space occupied by its contents. This means that containers can only affect: [inline logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties), `width` and related properties, and spacing properties that affect horizontal dimensions (`padding-[left/right]`, etc).
