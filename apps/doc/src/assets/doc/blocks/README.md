---
title: Blocks
slug: blocks
tags: ['blocks']
inputs: ['blocks.element']
context: ['app.settings']
---

## What are Blocks ?

`Blocks` are self contained, atomic components that provide a piece of information, action, or navigation option to the user of the app. They are generally mapped to a specific HTML tag, or related tags.

They are implemented using the [web platform](https://developer.mozilla.org/en-US/docs/Web)'s capabilities and with help from the examples provided in [Inclusive Components](https://inclusive-components.design/).

`Blocks` can be [composed](https://cube.fyi/composition.html) with `Layouts` and other `Blocks` to create simple or elaborate interfaces while respecting HTML semantics and document structure.

### Example

The examples below are two ways of achieving the same end result: a button that will submit the `<form>` that contains it, provided that the `<form>` element has a defined `action` attribute.

1. HTML markup

   ```html
   <button id="submit">Submit</button>
   ```

1. A `Button` component, written in Svelte

   ```svelte
   <Button id="submit" />
   ```

What is the point of creating a `Button` component ? (regardless of the choice of framework)

Here are a few answers to that:

- solving state management in one place
- solving style management in one place
- developing and improving accessibility standards
- maintaining design choices as the application grows
- establishing conventions
- documenting usage in one place

The example above uses the simplest, most trivial `<button>` element, but it is an element that deserves attention as it is ubiquitous in most applications, yet it is often sadly mistreated.

**We can do better!**

In this library you will find 4 distinct button `blocks`: `Button` `Expand`, `Switch`, and `Toggle`. They all contain a `<button>` and share some props, such as `size` and `color` for styling, or `text` and `formaction` to encode meaning and action. But each of these components is used in different contexts and with different semantic intentions: the components help encapsulate these specificities to make their usage consistent throughout the app.

To keep this project manageable, the UI library grows in response to application needs: the addition of each button component mentioned above is the result of a use case that needed it.

### Using Forms

`Blocks` components include `<input>` and `<button>` components.
For these components to have an effect without JavaScript enabled, they must be inside a `<form>` element that has at least one defined `action`.
By default, a `<button>` without a `type` attribute will be considered a `submit` button: on click, or if the user presses <kbd>Enter</kbd>, the button will submit the form it belongs to.

## Resources

- [MDN - The Form Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)
- [Svelte Form Actions](https://kit.svelte.dev/docs/form-actions)
