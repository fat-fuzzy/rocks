---
title: Toggle
slug: Toggle
category: 'blocks'
group: 'buttons'
props_state: ['title', 'text', 'formaction', 'value']
props_style:
  {'blocks': {'block': ['color', 'variant', 'size', 'asset', 'shape']}}
---

## Usage

This component contains a button that will toggle between two states without changing its text content.

The state is reflected in the value of the attribute `aria-pressed`.

This component can be used to submit a form, either via the default `action` set on the parent form element, or via a specific `formaction` provided as props to the Button component.

## Resources

- [MDN - The Button Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)
- [Inclusive Components - Toggle Buttons](https://inclusive-components.design/toggle-button/)
