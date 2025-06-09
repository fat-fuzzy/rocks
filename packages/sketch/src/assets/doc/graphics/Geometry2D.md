---
title: Geometry2D
slug: geometry-2d
category: 'graphics'
props_state: ['geometry']
props_style:
  {
    'blocks': {'block': ['color', 'size']},
    'layouts':
      {'layout': ['layout', 'threshold'], 'container': ['container', 'size']},
  }
context: ['app.settings']
---

## Usage

This component provides inputs to interact with a 2D geometry in a `<canvas>` inside a `Sketch` component.
The available inputs are _Position_, _Translation_, and _Scale_, implemented via the following components:

- `Position` component in `graphics`
- `Rotation` component in `graphics`
- `Scale` component in `graphics`

These input components are displayed in the documentation as part of this `graphics` component, but are declared in distinct Svelte files.

### Related Components

- `Fieldset` component in `blocks`
- `InputRange` component in `blocks`
- `Switcher` component in `layouts`

## Resources

The geometry interactions are based on the sections
on [translation](https://webglfundamentals.org/webgl/lessons/webgl-2d-translation.html), [rotation](https://webglfundamentals.org/webgl/lessons/webgl-2d-rotation.html) and [scale](https://webglfundamentals.org/webgl/lessons/webgl-2d-scale.html) of the [webglfundamentals.org](https://webglfundamentals.org/) tutorial.
