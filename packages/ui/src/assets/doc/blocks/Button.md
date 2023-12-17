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

### Examples

<p class="feedback bare emoji:default">Coming Soon!</p>

## CSS Variables

The CSS variables for button colors reflect the combination of the following factors:

- **Brightness:** day, night
- **Contrast:** blend, contrast
- **Element:** Button, Toggle, Switch, Expand
- **State:** default, disabled, hover, focus, active
- **Color:** none, primary, accent, highlight
- **Variant:** fill, outline, bare

For each [**Brightness** x **Contrast**], an **Element** has to have styling rules for each **State**, given every combination of [**Color** x **Variant**]

<p class="feedback bare emoji:default"> The generation of  CSS color variables and button mixins is still a work in progress. More to come soon!</p>

## Resources

- [MDN - The Button Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)
