---
title: Sketch
slug: Sketch
category: 'graphics'
props_state: ['scene', 'title']
props_style:
  {
    'blocks': {'block': ['color', 'variant', 'dimensions']},
    'layouts': {'container': ['container', 'size']},
  }
context: ['app.settings']
---

## Usage

This component contains a `<canvas>` element with controls to enable the following interactions:

- start and stop WebGL animations
- manipulate a geometry drawn on the `<canvas>`

The `Sketch` takes as props a `Scene` object that must provide the following functions:

- `main` : a function that initializes the WebGL context and program and returns a `programInfo` object
- `draw` : a function that redraws the image on the canvas. This function is called in a loop to render the animation
- `update` : a function that updates the scene's `programInfo` and WebGL buffers. This function is called when the user interacts with the geometry controls
- `clear` : a function that resets the `Scene`

### Related Components

- `Geometry` component in `graphics`
- `Geometry3D` component in `graphics`
- `FieldOfView` component in `graphics`
- `Camera` component in `graphics`
- `Player` component in `graphics`
- `Switcher` component in `layouts`
- `Sidebar` component in `layouts`

### Related Packages

This component uses libraries and animations defined in the package [(GitHub) /package/lib/gfx](https://github.com/fat-fuzzy/rocks/tree/main/packages/lib/src/gfx)

## Resources

The `Scene` objects used in these demos are based on the examples provided in the [webgl2fundamentals.org](https://webgl2fundamentals.org/) tutorials.

The source code of the `Scene` used for this demo can be found here: [(GitHub) /packages/lib/gfx/ sketches/011](https://github.com/fat-fuzzy/rocks/tree/main/packages/lib/src/gfx/sketches/011).

- [MDN - The Canvas element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas)
- [MDN - Getting started with WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL)
- [MDN WebGL API Doc](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
- [webglfundamentals.org](https://webglfundamentals.org/) and [webgl2fundamentals.org](https://webgl2fundamentals.org/)
- [Raw WebGL - by Nick Desaulniers](https://www.youtube.com/watch?v=H4c8t6myAWU) A great introductory presentation to WebGL concepts. The `Scene` object, and the graphics library developed with this project are in large part inspired by the examples given in this talk.
