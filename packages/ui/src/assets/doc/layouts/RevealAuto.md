---
title: RevealAuto
slug: RevealAuto
family: ['layouts']
# group: ['reveal']
content_type: ['any']
props_style: ['size', 'breakpoint']
context: ['app.settings']
---

## Usage

Use a `RevealAuto` layout to automatically collapse content at a specified breakpoint. The user can show or minimize content with a button action when the content is collapsed.

### Related Components

- `Button` component in `blocks/buttons`
- `Reveal` component in `layouts`

### Examples

<p class="feedback bare emoji:default">Coming Soon!</p>

### No JS

For a button action to have an effect without JavaScript enabled, it must be inside a `<form>` element that has at least one defined `action`. By default, a button without a `type` attribute will be considered a 'submit' button: on click, it will submit the form it belongs to.

If a form contains more than one button with different actions expected on click, each button must have a distinct `formaction` attribute.

## Resources

- [MDN - The Form Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)
- [Inclusive Components - Menus & Menu buttons](https://inclusive-components.design/menus-menu-buttons/)
