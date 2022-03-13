# Define Initial Packages and Stack

## Context and Problem Statement

Define initial package structure in Monorepo.
Meet the following requirements (adapted from `mad/README.md`)

* **Integrates an automated design workflow**
  design changes can be implemented easily and gracefully
* **Is flexible**
  I can create a variety of common application scenarios using the existing packages
* **Is efficiently documented**
  It is easy to understand how the packages work together
* **Is well tested and easily testable**
  I can make changes with confidence
* **Has a low maintenance cost**

## Considerations

Resulting architecture is based on:

* Open-source examples (Svelte, serverless framework, JAM Stack, arc42, ...)
* Experience from personal projects (GraphQL, Svelte, AWS, serverless framework, testing, UI Design)
* Current client work (Node, GraphQL, Vue, testing)
* Experience from previous client work (WordPress, React, JSON Schemas, AWS, Design Systems)

**TODO** : Add links

## Decision Outcome

Initial package structure:

* **api** API code
* **client** frontend application structure
* **components** frontend component library
* **design** design tokens and other relevant design resources
* **doc** architectural decisions and other doc-worthy information
* **resources** backend resources (database, auth, storage, etc)
* **utils** common utilities
