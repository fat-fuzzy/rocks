---
title: Packages
date: '2024-07-21'
updated: null
slug: packages
id: '001'
tags: ['example', 'doc', 'packages', 'wip']
---

## Contents

This repository contains the following packages :

- **config** common config (eslint, prettier, cz-conventional-commit _slightly_ custom lib)
- **markdown** a utility package for loading markdown files based on [bluwy website markdown package](https://github.com/bluwy/website/tree/master/packages/markdown) (currently unused)
- **style** a CSS library
- **ui** a frontend component library written in Svelte
- **playbook** a library used to display, document and test the **style** and **ui** packages, started as a way to replace Storybook (you can read about this decision [here](/doc/decisions/simplify-doc))
- **sketch** a library used to display and handle interactive web graphics program: this usage is one of the initial motivations for this project
- **lib** Libraries unrelated to building an interface or utility functions: logic and experiments
  - 👾 gfx - everything related to working with web graphics, except the interface (the interface for these experiments is the package **sketch**)
  - 🤖 state machines
  - ➕ maths
- **git-poule** a tool to extract commit data

## Usage Examples

The packages in this repo can be used together or independently, depending on the use case.
For example, the package **ui** can be used to build apps in different contexts:

- on a Django app and in a Jupyter Notebook (currently in a private repo)
- this website is built using the following packages:
  - **style**
  - **ui**
  - **playbook** used to render the content and functionality of the [UI](/ui) page and its children
  - **sketch** used to render the children of the [PLAY](/play) page
- The package **lib/gfx** package is a package that I use to learn web graphics.
- I'm experimenting with data analysis and learning R: I built the **git-poule** script to analyze the work done in this repo
