---
title: Switch
slug: Switch
family: ['blocks']
group: ['buttons']
props_state: ['title', 'text', 'formaction', 'value']
props_style: ['color', 'variant', 'size', 'asset', 'shape']
context: ['app.settings']
---

## Usage

This component contains a button that will switch between two states. Each state can have its own text, style, and asset (if any) according to its active / inactive state.

The state is reflected in the value of the attribute `aria-pressed`.

This component can be used to submit a form, either via the default `action` set on the parent form element, or via a specific `formaction` provided as props to the Button component.

### Examples

<p class="feedback bare emoji:default">Coming Soon!</p>

### No JS

For a button action to have an effect without JavaScript enabled, it must be inside a `<form>` element that has at least one defined `action`. By default, a button without a `type` attribute will be considered a 'submit' button: on click, it will submit the form it belongs to.

If a form contains more than one button with different actions expected on click, each button must have a distinct `formaction` attribute.

## Resources

- [MDN - The Button Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)
- [Inclusive Components - Toggle Buttons](https://inclusive-components.design/toggle-button/)
