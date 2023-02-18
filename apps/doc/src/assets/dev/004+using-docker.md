---
title: Using Docker
date: 'YYYY-MM-DD'
slug: using-docker
id: '004'
tags: ['example', 'doc', 'app']
---

## Use Case Example

[TODO]

## Requirements

- Docker
- pnpm
- Turborepo

[TODO] check

## Getting started

[TODO]

### App image

Run **apps/doc** site in a docker container

Build

```shell
 docker build -t rocks-image .
```

Run app on port 5173

```shell
docker run -t -p 5173:80 rocks-image
```

Debug:

1. Remove code until it builds, then see what is inside image using shell:

   ```shell
   docker run -it rocks-image sh
   ```

1. See what the output of turbo is:

   ```shell
   pnpm turbo prune --scope="packagename" --docker
   ```

**TODO:** Or with docker-compose

```shell
docker-compose build rocks-image
docker-compose up -d rocks-image
```

When is this usage appropriate
Examples

## Resources

[TODO]
