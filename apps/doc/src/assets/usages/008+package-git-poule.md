---
title: 'Git Poule'
date_created: '2024-07-27'
date_updated: '2024-07-27'
slug: git-poule
asset: package-git-poule
id: '008'
tags: ['example', 'doc', 'git-poule', 'git', 'data', 'packages', 'wip']
---

## Contents

This package is a tool to extract commit data from the repository.
It is used in conjunction with the package `@fat-fuzzy/cz-changelog` (see the [Utility Packages](/about/usage/utilities) for details).

Quick n dirty script to extract commit data and output it into a csv format.
It parses all commits accessible via `git log` provided that the commit messages follow the format defined in a `cz-conventional-commit` format used in the repository.

In this repo, the format is modified from the original `cz-conventional-commit` as described below.

## Commit Message Conventions

Messages should follow the following convention:

**Format:** EMOJI [SCOPE] DESCRIPTION

**Examples:**

- 🚧 [root] Deprecate some feature
- 💄 [ui] New Layout class definitions

The emojis used are limited to the set defined in the root's `.czrc` config file.

NOTES:

- commits previous to the commitizen config setup might fall outside of the defined emoji set
- Merge commits descriptions are shortened (`pull request #XXX'` is removed)
- Some commits have a `null` scope: this is to account for
  - earlier commits where scope might not have been defined
  - bot commits
  - Merge commits

The output will be a CSV file containing the messages are split into its constituent parts as described above. It also includes metadata about the commit: PR number if any, commit hash, timestamp, and author. The scope is further split into details if possible.

[TODO: more on scope]

**Example:**

```txt
"PR", "HASH", "DATE", "YEAR",  "MONTH", "DAY", "TIME", "COMMIT_TYPE", "SCOPE", "SCOPE.x" ... "SCOPE.z", "DESCRIPTION", "AUTHOR"
1, "6063421", "19/11/2023", "2023", "nov.", "19", "20:42","Merge", null, "SCOPE.x" ... "SCOPE.z", "from branch-x","author-name"
null, "fd376f5", "19/11/2023", "2023", "nov.", "19", "18:10", "fix:", null, "SCOPE.x" ... "SCOPE.z", "Update dependency X", "bot-name"
null, "686ae3b", "12/10/2023", "2023", "oct.", "12", "10:20", "🚧", "root", "SCOPE.x" ... "SCOPE.z", "Deprecate some feature", "author-name"
null, "c7d83d9", "11/10/2023", "2023", ""oct.", "11", "17:33", "💄", "ui", "SCOPE.x" ... "SCOPE.z", "New Layout class definitions", "author-name"
null, "5ec9b8a", "02/09/2023", "2023", "sept.", "02", "21:12", "🎉", null, "SCOPE.x" ... "SCOPE.z", "Initial commit - README", "author-name"
```

## Requirements

This script assumes that you have a repo with a commit convention configuration as described above. If the commit conventions vary, the script has to be adapted to fit those conventions.

### Usage

#### Commit Data

Inside a git repository

```shell
  node path/to/script/index > commits.csv
```

This will output a `commits.csv` in the current directory.

#### Commit Conventions Data

A second script can be used to extract commit conventions data from the local `.czrc` file:

```shell
  node path/to/script/commitTypes > commit_types.csv
```

This will output a `commit_types.csv` in the current directory.

### JSON

An earlier version of the script output a JSON file under the following format:

```json
/* prettier-ignore */
{
  "commits": [
    ["PR", "HASH", "TIMESTAMP", "EMOJI", "SCOPE", "DESCRIPTION", "AUTHOR"],
    [null, "fd376f5", "1702558783", "fix:", null, "Update dependency X", "bot-name"],
    [null, "686ae3b", "1705074852", "🚧", "root", "Deprecate some feature", "author-name"],
    [null, "c7d83d9", "1573663878", "💄", "ui", "New Layout class definitions", "author-name"],
    [null, "5ec9b8a", "1573663745", "🎉", null, "Initial commit - README", "author-name"]
  ]
}
```

The code corresponding to that version is commented out on the script

## Checklist

Make sure that you

- understand what the script is doing
- know the contents and history of the repo you want to analyze
- have the necessary rights over the repository you will be manipulating
- have a backup of your repo in case anything goes wrong

## Resources

- Adapted from this article : [Git: Merge Repositories/replay commits on other repo](https://makandracards.com/markus/47974-git-merge-repositories-replay-commits-on-other-repo)
- Uses [ShellJS](https://documentup.com/shelljs/shelljs#) ("Unix shell commands for Node.js" - and yes, maybe a shell scrip directly would be better, but I'm less familiar with string manipulation using shells scripts)
