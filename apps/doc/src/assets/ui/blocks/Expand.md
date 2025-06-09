---
title: Expand
slug: Expand
category: 'blocks'
group: 'buttons'
props_state: ['title', 'text', 'formaction', 'value', 'controls', 'states']
props_style: {'blocks': {'block': ['color', 'variant', 'size', 'shape']}}
---

## Usage

This component contains a button that will expand the DOM element it controls when active, or minimize it when inactive. Each state can have its own text, style, and asset (if any) according to its active / inactive state.

The DOM element under control is reflected in the value of the attribute `aria-controls`.

The state of the element under control is reflected in the value of the attribute `aria-expanded`.

This component can be used to submit a form, either via the default `action` set on the parent form element, or via a specific `formaction` provided as props to the Button component.

### Related Components

- `Button` component in `blocks`
- `Reveal` component in `layouts`

## Resources

- [MDN - The Button Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)
- [Inclusive Components - Menus & Menu buttons](https://inclusive-components.design/menus-menu-buttons/)
