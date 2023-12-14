---
title: Button
slug: Button
family: ['blocks']
group: ['buttons']
props_state: ['title', 'text', 'formaction', 'value']
props_style: ['color', 'variant', 'size', 'asset', 'shape']
context: ['app.settings']
---

## Usage

This component contains a basic button that can be used to submit a form, either via the default `action` set on the parent form element, or via a specific `formaction` provided as props to the Button component.

### Class System

The class system reflects the combination of the following factors:

| Brightness | Contrast | Element | Theme Color | Variant | State    |
| ---------- | -------- | ------- | ----------- | ------- | -------- |
| day        | blend    | button  | - none -    | fill    | default  |
| night      | contrast |         | primary     | outline | disabled |
|            |          |         | accent      | bare    | hover    |
|            |          |         | highlight   |         | focus    |
|            |          |         |             |         | active   |

For each Theme, the button Element has to have styling rules for each State, given every combination of [Color *x* Variant]

## Requirements

### No JS

For a button action to have an effect without JavaScript enabled, it must be inside a `<form>` element that has at least one defined `action`. By default, a button without a `type` attribute will be considered a 'submit' button: on click, it will submit the form it belongs to.

If a form contains more than one button with different actions expected on click, each button must have a distinct `formaction` attribute.

## Getting started

[TODO]

## Resources

[TODO]
