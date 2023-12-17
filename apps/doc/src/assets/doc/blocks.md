---
title: Blocks
slug: blocks
tags: ['blocks']
inputs: ['blocks.element']
context: ['app.settings']
---

## Usage

Blocks are self contained, atomic components that provide a piece of information, action, or navigation option to the user of the app. They are generally mapped to a specific HTML tag, or related tags.

They are implemented using the [web platform](https://developer.mozilla.org/en-US/docs/Web)'s capabilities and with help from the examples provided in [Inclusive Components](https://inclusive-components.design/).

Blocks can be [composed](https://cube.fyi/composition.html) with Layouts and other Blocks to create simple or elaborate interfaces while respecting HTML semantics and document structure.

## No JS

For an input or a button action to have an effect without JavaScript enabled, it must be inside a `<form>` element that has at least one defined `action`.
By default, a button without a `type` attribute will be considered a `submit` button: on click, it will submit the form it belongs to.

If a form contains more than one button with different actions expected on click, each button must have a distinct `formaction` attribute.
