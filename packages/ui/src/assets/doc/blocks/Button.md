---
title: Button
slug: Button
family: ['blocks']
group: ['buttons']
props: ['color', 'variant', 'size', 'asset']
context: ['app.settings']
---

## Usage

When is this usage appropriate
Examples

[TODO]

### Class System

The class system reflects the combination of the following factors:

| Theme | Element | Color     | Variant | State    |
| ----- | ------- | --------- | ------- | -------- |
| day   | button  | - none -  | fill    | default  |
| night |         | primary   | outline | disabled |
|       |         | accent    | bare    | hover    |
|       |         | highlight |         | focus    |
|       |         |           |         | active   |

For each Theme, the button Element has to have styling rules for each State, given every combination of [Color *x* Variant]

## Requirements

### No JS

For a button action to have an effect without JavaScript enabled, it must be inside a `<form>` element that has at least one defined `action`. By default, a button without a `type` attribute will be considered a 'submit' button: on click, it will submit the form it belongs to.

If a form contains more than one button with different actions expected on click, each button must have a distinct `formaction` attribute.

## Getting started

[TODO]

## Resources

[TODO]
