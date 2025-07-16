---
title: 'Fat Fuzzy Wings
date_created: '2022'
date_updated: '2025-07-14'
slug: fat-fuzzy-wings
categories: ['webgl', 'learn']
tags: ['2D']
id: '004'
series: ['001', '002', '003']
---

## 🚧 WHat / Why

TODO

## 🚧 How

Use primitive type `LINE` :

- [MDN - WebGL Constants](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants)
- [webglfundamentals - Points, Lines, and Triangles](https://webglfundamentals.org/webgl/lessons/webgl-points-lines-triangles.html)
TODO

### Wing Structure

1. The wing has bones:
   - a scapula bone that moves the wing to and from the body
   - a humerus bone that moves the wing up and down
   - a radius+ulna bone structure that moves the mid wing in and out
   - a metacarpal 'finger' bone that moves the wing tip in and out
   - a metacarpal 'thumb' bone that moves the wing tip in and out
1. The wing has 3 layers of feathers:
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

**1 Cycle** > **2 Sequences** > **5 Movements: [pause, beginning, middle, end, pause]** >  **100 - 1000 [middle steps], (100 - 1000) / 3 [end steps], 7 [pause steps]**

1. **Cycle**
   - the wing moves in a cycle of two sequences of movements:
     - opening sequence
     - closing sequence
1. **Sequence**
   - each sequence has the following movements:
   | 1     | 2         | 3      | 4   | (five)  |
   | ----- | --------- | -------|---- |-------- |
   | pause | beginning | middle | end | (pause) |
1. **Movement**
   - each movement has a series of steps which can be variable in length
   - the number of steps of a movement determines its speed and smoothness
   - the first movement (and last, TODO) is followed by a pause movement (= no translation)

## 🚧 Resources

TODO
