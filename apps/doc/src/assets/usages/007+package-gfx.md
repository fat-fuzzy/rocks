---
title: 'GFX'
date_created: '2024-07-27'
date_updated: '2024-07-27'
slug: gfx
asset: package-gfx
id: '007'
tags: ['example', 'doc', 'gfx', 'packages', 'wip']
---

## Contents

This package contains:

- tools to work with web graphics APIs (currently WebGL)
- a collection of `sketches`: these are self contained programs that can be rendered by the Sketch library
- learning notes

### Requirements

A Node.js environment and a `package.json`

Sketches can be rendered using this package:

- [@fat-fuzzy/sketch](https://github.com/fat-fuzzy/rocks/tree/main/packages/sketch)

### Usage

Install the package as a `devDependency`:

```shell
pnpm i -D @fat-fuzzy/gfx
```

Import and use the sketches:

```js
<script lang="ts">
  import {dev} from '$app/environment'
  import gfx from '@fat-fuzzy/gfx'
  import {graphics} from '@fat-fuzzy/sketch'

  let scene = $derived(gfx.gl.sketches.find((s) => s.meta.slug === $page.data.slug))
</script>

<Sketch {scene} size="sm" {dev}/>
```

GFX library sketches are modules that expose the following functions:

```js
function init(canvas) {}
function main(canvas) {}
function update(context) {} // context depends on the type of program
function clear() {}
function stop() {}
function draw(t) {} // t is for time, an optional parameter
```

[TODO] : elaborate doc about graphics programs

### GLSL

Importing a shader in vite:

```js
import shader from '/some/shader.glsl?raw'
```

## Resources

You'll find some resources I've found useful for learning web graphics here: [Play > Learning](https://rocks.pages.dev/play/learning)
