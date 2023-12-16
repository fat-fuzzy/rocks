---
title: RevealNav
slug: RevealNav
family: ['compositions']
group: ['navs']
props_state: ['title', 'formaction', 'items']
props_style: ['color', 'variant', 'size', 'background']
context: ['app.settings', 'shared.container']
---

## Usage

Use a `RevealNav` component to provide related navigation options that can be shown or minimized using a button.

### Related Components

- `Expand` component in `blocks`
- `Reveal` component in `layouts`
- `Nav` component in `composition/navs`

### Examples

<p class="feedback emoji:default">Coming Soon!</p>

## Requirements

### No JS

For a button action to have an effect without JavaScript enabled, it must be inside a `<form>` element that has at least one defined `action`. By default, a button without a `type` attribute will be considered a 'submit' button: on click, it will submit the form it belongs to.

If a form contains more than one button with different actions expected on click, each button must have a distinct `formaction` attribute.

## Resources

- [MDN - The Anchor Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a)
- [MDN - The Navigation Section Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav)
- [Inclusive Components - Menus & Menu buttons](https://inclusive-components.design/menus-menu-buttons/)
