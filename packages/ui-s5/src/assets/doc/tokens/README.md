---
title: Tokens
slug: tokens
tags: ['tokens']
context: ['app.settings']
---

## What are Tokens ?

`Tokens` are the Design Tokens of the UI library.

Design Tokens are `[key, value]` pairs that define design choices such as `Color`, `Typography`, or `Scale`.
`Tokens` are defined using CSS variables, and are sometimes styled via native HTML tags (ex: `Typography` rules can target `h1` elements directly).

`Tokens` provide the base values used to build `Blocks`, `Layouts`, and `Compositions`.

All the tokens that are currently defined can be found in the [SCSS library's tokens folder](https://github.com/fat-fuzzy/rocks/tree/main/packages/ui/src/lib/styles/scss/tokens)

<p class="feedback bare emoji:default">The generation of design tokens in this library is still a work in progress. More detailed documentation coming soon! </p>

## Resources

- [W3C Design Tokens Community Group](https://www.w3.org/groups/cg/design-tokens/)
- [Open Props](https://open-props.style/) : A design tokens library
- [Style Dictionary](https://amzn.github.io/style-dictionary) : A tool to generate design tokens from json files
