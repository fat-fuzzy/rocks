---
title: Layouts
id: 'ui-layouts'
date_created: '2023-10-14'
date_updated: 'YYYY-MM-DD'
slug: layouts
tags: ['ui']
---

In CUBE CSS, `Layouts` are [compositions](https://cube.fyi/composition.html). This means that `Layouts` are components used to structure and organize the content and interface elements it contains.

These Layouts are largely based on the teachings and examples put forth in [every-layout.dev](https://every-layout.dev/), and aim to use minimal HTML markup and carefully written CSS to work in harmony with the browsers's layout algorithms.

Containers are a type of Layout that limit the amount of horizontal space occupied by its contents. This means that containers can only affect: [inline logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties), `width` and related properties, and spacing properties that affect horizontal dimensions (`padding-[left/right]`, etc).
If the only direct child of a Container is another Container, it might be a good idea to review how that markup is constructed.
