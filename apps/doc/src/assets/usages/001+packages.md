---
title: Packages
date: '2024-07-21'
slug: using-packages
id: '001'
tags: ['example', 'doc', 'packages', 'wip']
---

## Content

This repository contains the following packages

- **config** common config (eslint, prettier, cz-conventional-commit _slightly_ custom lib)
- **git-poule** a tool to extract commit data
- **lib** Libraries unrelated to building an interface or utility functions: logic and experiments
  - 👾 gfx - everything related to working with web graphics, except the interface (the interface for these experiments is the package **sketch**)
  - 🤖 state machines
  - ➕ maths
- **markdown** A utility package for loading markdown files
  - based on [bluwy website markdown package](https://github.com/bluwy/website/tree/master/packages/markdown)
- **playbook** a package used to display, document and test the **ui** and **style** packages, started as a way to replace Storybook (you can read about this decision [here](http://localhost:5173/doc/decisions/simplify-doc))
- **style** a CSS library
- **sketch** a package used to display and handle interactive web graphics programs (used for learning: this usage is one of the initial motivations for this project)
- **ui** A frontend component library (Svelte 4):
  - this is the first component library I created for this project, and it contains the initial logic for the **playbook**,  **style**, and **sketch** packages
- **ui-s5** A frontend component library (Svelte 5):
  - I reduced the UI library to a set of components that can be shared across sites, and extracted the logic of the **playbook** and **sketch** interfaces, as well as the CSS library (**style**) into their own packages
