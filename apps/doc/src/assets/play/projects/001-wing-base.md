---
title: 'Wing Base'
id: '001'
date_created: '2022'
date_updated: '2025-07-14'
slug: wing-base
description: 'Wings, lines, and WebGL'
categories: ['webgl', 'learn']
tags: ['2D', 'wings']
series: ['001', '003']
---

## Context

I'm trying to build a schematic animated wing using the `LINE` WebGL primitive. Is "primitive" the right word in this technical context? I'm not sure, but it seems analogue to technical primitives found elsewhere.

The "schematic" part is modeled on these sources:

- Drawing courses I have taken on drawing people. In particular, [Will Weston's](https://drawingamerica.com/instructors/weston/) fantastic lessons have helped me better understand movement and articulations of the human body. A wing follows similar mechanics to those of a human arm and hand.
- A couple of videos that explain how wing movement works and how to draw wings (see [Resources 👇](#resources))

## Idea

Use primitive type `LINE` to model the mechanics of the Wing's structure and feathers.

### Wing Structure

1. The wing has bones:
   - a scapula bone that moves the wing to and from the body
   - a humerus bone that moves the wing up and down
   - a radius+ulna bone structure that moves the mid wing in and out
   - a metacarpal 'finger' bone that moves the wing tip in and out
   - a metacarpal 'thumb' bone that moves the wing tip in and out
1. The wing has 4 layers of feathers:
   - layer 1:
     - the humerus bone has 6 feathers
     - the radius+ulna bone structure has 10 feathers
     - the metacarpal 'finger' bone has 8 feathers
   - layer 2:
     - the radius+ulna bone structure has 12 feathers
     - the metacarpal 'finger' bone has 10 feathers
   - layer 3:
     - the humerus bone has 5 feathers
     - the radius+ulna bone structure has 7 feathers
     - the metacarpal 'finger' bone has 5 feathers
   - layer 4:
     - the humerus bone has fluffy feathers
     - the radius+ulna bone structure has fluffy feathers
     - the metacarpal 'finger' bone has fluffy feathers
     - the metacarpal 'thumb' bone has 3 feathers

### Wing movement

- **A Cycle** contains 2 Sequences
- **A Sequence** contains 5 Movements: [pause, beginning, middle, end, pause]
- **A Movement** contains 100 - 1000 [middle steps], (100 - 1000) / 3 [end steps], 7 [pause steps]

In other words:

1. **Cycle**
   - the wing moves in a cycle of two sequences of movements:
     - opening sequence
     - closing sequence

1. **Sequence**

   Each sequence has the following movements:

| 1     | 2         | 3      | 4   | (five)  |
| ----- | --------- | ------ | --- | ------- |
| pause | beginning | middle | end | (pause) |

1. **Movement**
   - each movement has a series of steps which can be variable in length
   - the number of steps of a movement determines its speed and smoothness
   - the first movement (and last) is followed by a pause movement (= no transformation in geometric terms)

<h2 id="resources">Resources</h2>

- [MDN - WebGL Constants](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants)
- [webglfundamentals - Points, Lines, and Triangles](https://webglfundamentals.org/webgl/lessons/webgl-points-lines-triangles.html)
- [Will Weston Anatomy Drawings](https://www.youtube.com/watch?v=dHDvRJD0o44)
- [Bio Animation: Wing Spread & Fold](https://www.youtube.com/watch?v=GFCgwglikcY&list=PLM5hYIDGPIikMe2ZoRpVtsp2cTgsTOgXc&index=1)
- [How to Draw BIRD WINGS (feathers, wing shapes, anatomy)](https://www.youtube.com/watch?v=HBOO9vvizco&list=PLM5hYIDGPIikMe2ZoRpVtsp2cTgsTOgXc&index=2)
