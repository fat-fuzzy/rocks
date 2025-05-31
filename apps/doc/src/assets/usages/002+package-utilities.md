---
title: 'Utilities'
date_created: '2024-07-27'
date_updated: '2024-07-27'
updated: null
slug: utilities
asset: package-utilities
id: '002'
tags: ['example', 'doc', 'utilities', 'config', 'packages', 'wip']
---

## Contents

The following packages contain shared utilities:

- **[@fat-fuzzy/config](https://github.com/fat-fuzzy/rocks/tree/main/packages/config)** shared configuration
- **[@fat-fuzzy/cz-changelog](https://github.com/fat-fuzzy/rocks/tree/main/packages/cz-changelog)** This is a package that takes the [cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog) and adapts it to produce commit comments as specified in [@fat-fuzzy/git-poule](https://github.com/fat-fuzzy/rocks/tree/main/packages/git-poule).
- **[@fat-fuzzy/validation](https://github.com/fat-fuzzy/rocks/tree/main/packages/validation)** a package that exports validation tools

## Config

### Requirements

- [prettier](https://prettier.io/docs/en/install)
- [eslint](https://eslint.org/docs/latest/extend/shareable-configs)
- [playwright](https://playwright.dev/docs/intro)
- [stylelint](https://stylelint.io/user-guide/configure/)

### Usage

Install the package as a `devDependency` in your package:

```shell
pnpm i -D @fat-fuzzy/config
```

Import the shared config in another package:

```js
// in .packages/new-package/.eslint.config.js
import baseConfig from '@fat-fuzzy/config/eslint/base'
import svelteConfig from '@fat-fuzzy/config/eslint/svelte'
import { includeIgnoreFile } from '@eslint/compat';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Correctly determine gitignorePath relative to *this* eslint.config.js file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Adjust '../../.gitignore' to point to your monorepo root .gitignore
const gitignorePath = path.resolve(__dirname, './.gitignore');

export default [ // ESLint 9 expects an array
  includeIgnoreFile(gitignorePath), // Apply gitignore at the project level
  ...baseConfig, // Spread the imported shared configuration
 svelteConfig, // Spread the Svelte-specific configuration
];

```

```js
// in .packages/new-package/prettier.config.js
import prettier from '@fat-fuzzy/config/prettier'

export default prettier
```

```js
// in .packages/new-package/stylelint.config.js
import stylelint from '@fat-fuzzy/config/stylelint'

export default stylelint
```

Set the `prettier.configPath` in `.vscode/settings.json`

```json
{
 "prettier.configPath": "./prettier.config.js"
}
```

If you use a VSCode workspace and you add folders outside the root folder the Explorer view (the sidebar view of your folders), then you have to set `prettier.configPath` for that folder in a `.code-workspace` file located under the main project root folder:

```json
{
 "folders": [
  {
   "path": ".",
  },
  {
   "path": "packages/my-package",
  },
 ],
 "settings": {
  ".": {
   "prettier.prettierPath": "./node_modules/prettier",
   "editor.formatOnSave": true,
   "prettier.configPath": "./prettier.config.js",
  },
  "my-package": {
   "prettier.prettierPath": "./node_modules/prettier",
   "editor.formatOnSave": true,
   "prettier.configPath": "./prettier.config.js",
  },
}
```

## Commitizen + Git Poule

### Requirements

- [commitizen](https://github.com/commitizen/cz-cli)
- [cz-conventional-changelog](https://eslint.org/docs/latest/extend/shareable-configs)

### Usage

Install the `commitizen` and `cz-conventional-changelog` in the repository root:

```shell
pnpm i -D commitizen cz-conventional-changelog
```

add a `.czrc` config with the following shape:

```json
{
 "path": "packages/cz-changelog", // Location of the custom cz-changelog package
 "punctuation": { // This customization enables me to use the format:
  "type": " ",    // "EMOJI [SCOPE] COMMENT"
  "scope": [
   "[",
   "]"
  ]
 },
 "disableSubjectLowerCase": true,
 "types": {
    "🚧 ": {
    "description": "Work in progress",
    "title": "WIP"
    },
    "🌱 ": {
    "description": "Gardening / baby step / cleaning code",
    "title": "Gardening"
    },
    ... other comment types here
  }
}
```

## Media

🚧 Work in progress

This package can be used to resize images using [https://sharp.pixelplumbing.com/](https://sharp.pixelplumbing.com/)
I am currently using this locally as a script and uploading the resulting images to the repository, which is far from ideal.

The script's instructions can be found here on the package's [README](https://github.com/fat-fuzzy/rocks/tree/main/packages/media)

### Resources on Asset management

- [Images in SvelteKit](https://kit.svelte.dev/docs/images)
- [Vite asset management](https://vitejs.dev/guide/assets.html)
- [This discussion on GitHub](https://github.com/vitejs/vite/discussions/13808) concerning the emission of static assets in Vite

## Validation

### Requirements

- [AJV](https://ajv.js.org/)
- some understanding of [JSON Schema](https://json-schema.org/)

### Usage

In order to adapt validation functions to a particular usage, you have to define the data structure using JSON Schema.
Once this is setup, you can generate standalone code to validate data according to the schema during runtime.

[TODO]

- make validation generation configurable from consumer
- document usage in more detail, add examples & resources
