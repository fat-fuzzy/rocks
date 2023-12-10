---
title: Expand
slug: Expand
family: ['blocks']
group: ['buttons']
props_state: ['title', 'text', 'formaction', 'value', 'controls']
props_style: ['color', 'variant', 'size', 'asset', 'shape']
context: ['app.settings']
---

## Usage

This component contains a button that will expand the DOM element it controls when active, or minimize it when inactive. Each state can have its own text, style, and asset (if any) according to its active / inactive state.

The DOM element under control is reflected in the value of the attribute `aria-controls`.

The state of the element under control is reflected in the value of the attribute `aria-expanded`.

This component can be used to submit a form, either via the default `action` set on the parent form element, or via a specific `formaction` provided as props to the Button component.

## Requirements

This component uses aria attributes to reflect state, which can be interpreted by users of assistive technologies and are also used as a CSS selectors to target each state for styling.

### No JS

For a button action to have an effect without JavaScript enabled, it must be inside a `<form>` element that has at least one defined `action`. By default, a button without a `type` attribute will be considered a 'submit' button: on click, it will submit the form it belongs to.

If a form contains more than one button with different actions expected on click, each button must have a distinct `formaction` attribute.

## Getting started

[TODO]

## Resources

[TODO]
