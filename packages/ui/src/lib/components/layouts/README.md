---
title: Layouts
date: 'YYYY-MM-DD'
slug: layouts
id: 'ui-layouts'
tags: ['ui']
---

Layouts are components that are used to organize how content is displayed on the screen, and designed to work in harmony with the browser's built-in layout algorithms.

These Layouts are largely based on the teachings and examples put forth in [every-layout.dev](https://every-layout.dev/), and aim to use minimal HTML markup and carefully written CSS that allow a varied range of design options.

Layouts are designed to be combined in [compositions](https://cube.fyi/composition.html). This means that a Layout can contain Blocks and other Layouts, which is a versatile yet intuitive way to create web page designs.

Containers are a type of Layout that limit the amount of horizontal space occupied by its contents. This means that containers can only affect: [inline logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties), `width` and related properties, and spacing properties that affect horizontal dimensions (`padding-[left/right]`, etc).
If the only direct child of a Container is another Container, it might be a good idea to review how that markup is constructed.
