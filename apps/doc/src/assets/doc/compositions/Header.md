---
title: Header
slug: Header
family: ['compositions']
group: ['headers']
content_type: ['Nav', 'Settings']
props_state: ['formaction']
props_style: ['size', 'color', 'variant', 'breakpoint', 'container']
context: ['app.settings', 'shared.container']
---

## Usage

Use a `Header` component to provide main app navigation and settings controls to the user.

### Related Components

- `RevealAuto` component in `layouts`
- `Nav` component in `composition/navs`
- `Settings` component in `compositions/forms`

### Examples

<p class="feedback bare emoji:default">Coming Soon!</p>

### No JS

For a button action to have an effect without JavaScript enabled, it must be inside a `<form>` element that has at least one defined `action`. By default, a button without a `type` attribute will be considered a 'submit' button: on click, it will submit the form it belongs to.

If a form contains more than one button with different actions expected on click, each button must have a distinct `formaction` attribute.

## Resources

- [MDN - The Anchor Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a)
- [MDN - The Navigation Section Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav)
- [Inclusive Components - Menus & Menu buttons](https://inclusive-components.design/menus-menu-buttons/)
