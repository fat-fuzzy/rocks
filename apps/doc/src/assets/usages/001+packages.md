---
title: Packages
date_created: '2024-07-21'
date_updated: '2024-07-21'
updated: null
slug: packages
id: '001'
tags: ['example', 'doc', 'packages', 'wip']
---

## Contents

This project contains the following packages :

**Frontend & Exploratory Packages**

- **[@fat-fuzzy/gfx](https://github.com/fat-fuzzy/rocks/tree/main/packages/gfx)** Everything related to working with web graphics, except the interface
- **[@fat-fuzzy/playbook](https://github.com/fat-fuzzy/rocks/tree/main/packages/playbook)** a library used to display, document and test the `@fat-fuzzy/style` and `@fat-fuzzy/ui` packages, started as a way to replace Storybook (you can read about this decision [here](/about/decisions/simplify-doc))
- **[@fat-fuzzy/prose](https://github.com/fat-fuzzy/rocks/tree/main/packages/prose)** a library used to edit and display text content
- **[@fat-fuzzy/sketch](https://github.com/fat-fuzzy/rocks/tree/main/packages/sketch)** a library used to display and handle interactive web graphics programs: this usage is one of the initial motivations for this project
- **[@fat-fuzzy/style](https://github.com/fat-fuzzy/rocks/tree/main/packages/style)** a CSS library
- **[@fat-fuzzy/ui](https://github.com/fat-fuzzy/rocks/tree/main/packages/ui)** a frontend component library written in Svelte

**Utility Packages**

- **[@fat-fuzzy/config](https://github.com/fat-fuzzy/rocks/tree/main/packages/config)** common config (eslint, prettier, ...)
- **[@fat-fuzzy/cz-changelog](https://github.com/fat-fuzzy/rocks/tree/main/packages/cz-changelog)** cz-conventional-commit _slightly_ custom lib
- **[@fat-fuzzy/git-poule](https://github.com/fat-fuzzy/rocks/tree/main/packages/git-poule)** a tool to extract commit data
- **[@fat-fuzzy/intl](https://github.com/fat-fuzzy/rocks/tree/main/packages/intl)** a lib to provide localization capabilities
- **[@fat-fuzzy/media](https://github.com/fat-fuzzy/rocks/tree/main/packages/media)** a lib that groups media management tools
- **[@fat-fuzzy/validation](https://github.com/fat-fuzzy/rocks/tree/main/packages/validation)** a utility package for validation tools

## Usage Examples

The packages in this repo can be used together or independently, depending on the use case.

For example, the package `@fat-fuzzy/ui` can be used to build apps in different contexts:

- on a Django app and in a Jupyter Notebook (currently in a private repo)
- this website is built using the following packages:
  - `@fat-fuzzy/style`
  - `@fat-fuzzy/ui`
  - `@fat-fuzzy/playbook` used to render the content and functionality of the [UI](/ui) page and its children
  - `@fat-fuzzy/sketch` used to render the interactive pages of the [PLAY](/play) page
- The package `@fat-fuzzy/gfx` contains what I learn about web graphics
- I'm experimenting with data analysis and learning R: I built the `@fat-fuzzy/git-poule` script to analyze the work done in this repo
