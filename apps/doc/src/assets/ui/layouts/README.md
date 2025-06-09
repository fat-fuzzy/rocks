---
title: Layouts
slug: layouts
tags: ['layouts']
props_style:
  {
    'blocks': {'block': ['size']},
    'layouts':
      {
        'layout': ['threshold', 'breakpoint'],
        'container': ['container', 'size'],
      },
  }
---

## What are Layouts ?

In CUBE CSS, `Layouts` are [compositions](https://cube.fyi/composition.html), which indicates that `Layouts` are components used to structure and organize the content and interface elements it contains.

These `Layouts` are largely based on the teachings and examples from [every-layout.dev](https://every-layout.dev/).

`Layouts` are designed to be combined with `Blocks` and other `Layouts` to create new components that maintain the characteristics defined in the design system's `Tokens`.

`Containers` are a type of `Layout` that limit the amount of horizontal space occupied by its contents. This means that containers can only affect: [inline logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties), `width` and related properties, and spacing properties that affect horizontal dimensions (`padding-[left/right]`, etc).
