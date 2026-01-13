---
title: Monorepo Update
date_created: '2023-03-23'
date_updated: '2023-03-23'
slug: monorepo-update
id: '006'
tags: ['architecture', 'tooling']
---

## Context and Problem

Managing and deploying a monorepo poses a number of problems I had not foreseen ( see [1 - Use Monorepo](/about/decisions/use-monorepo)):

- how to deploy individual packages that use shared resources?
- how to test that interdependent packages are built correctly ?
- how to deploy an app to a CDN ?

## Considered Option

- [Turborepo](https://turbo.build/)
  - ✅ it facilitates each of the points above
  - ❌ it requires refactoring of package structure

## Decision & Changes

Use Turborepo

- The problem of builds and deployment needs to be solved
- Turborepo's package structure provides a more intuitive organisation of the project

The new package structure is:

Workspaces:

- **apps**
  - contains frontend applications that use libraries defined in the packages workspace
- **infra**
  - contains code templates to provision infrastructure resources for the **apps**
- **packages**
  - contains common libraries used by other **packages**, by **apps** and by **infra**
