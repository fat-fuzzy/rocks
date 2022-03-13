# Use Monorepo with pnpm

## Context and Problem Statement

I want to have a clear view of project resources.
I want to be able to use packages independently (client, components, design resources, etc).
I want to minimize maintenance and dependency management.

## Considered Options

* [pnpm](https://pnpm.io)
* [yarn workspaces](https://yarnpkg.com/features/workspaces)
* Separate repos for each project

## Decision Outcome

Chosen option: to create a Monorepo with **pnpm**

* A Monorepo should facilitate dependency management and hopefully remove some maintenance overhead
* A Monorepo will more easily enable me to spawn new applications using shared resources
* **pnpm** is widely used by the Svelte community, and the project will use Svelte as a frontend framework (see [ADR-0002](0002-define-initial-packages-and-stack.md))
