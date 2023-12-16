---
title: ToggleMenu
slug: ToggleMenu
family: ['compositions']
group: ['menus']
props_state: ['title', 'formaction', 'value']
props_style: ['color', 'variant', 'size', 'background', 'layout', 'threshold']
context: ['app.settings', 'shared.container']
---

## Usage

Use a `ToggleMenu` component to provide a menu of mutually exclusive related actions to the user.

### Related Components

- `Toggle` component in `blocks/buttons`

### Examples

<p class="feedback emoji:default">Coming Soon!</p>

## Requirements

### No JS

For a menu button action to have an effect without JavaScript enabled, it must be inside a `<form>` element that has at least one defined `action`. By default, a button without a `type` attribute will be considered a 'submit' button: on click, it will submit the form it belongs to.

If a form contains more than one button with different actions expected on click, each button must have a distinct `formaction` attribute.

## Resources

- [MDN - The Button Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)
- [MDN - The Menu Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu)
- [MDN - The Form Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)
- [Inclusive Components - Toggle Buttons](https://inclusive-components.design/toggle-button/)
- [Inclusive Components - Menus & Menu buttons](https://inclusive-components.design/menus-menu-buttons/)
