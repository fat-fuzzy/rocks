# Script to extract commit data from git history

Quick n dirty script to extract commit data and output it into a csv format.
It parses all commits accessible via `git log` provided that the commit messages follow the format defined in a `cz-conventional-commit` format used in the repo.
In this repo, the format is modifed from the original as described below.

## Commit Message Conventions

Messages should follow the folllowing convention:

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

The output will be a CSV file containing the messages are split into its constituent parts as decribed above. It also includes metadata about the commit: PR number if any, commit hash, timestamp, and author.

**Example:**

```txt
"PR", "HASH", "TIMESTAMP", "EMOJI", "SCOPE", "DESCRIPTION", "AUTHOR"
1, "6063421", "1616438007", "Merge", null, "from branch-x","author-name"
null, "fd376f5", "1702558783", "fix:", null, "Update dependency X", "bot-name"
null, "686ae3b", "1705074852", "🚧", "root", "Deprecate some feature", "author-name"
null, "c7d83d9", "1573663878", "💄", "ui", "New Layout class definitions", "author-name"
null, "5ec9b8a", "1573663745", "🎉", null, "Initial commit - README", "author-name"
```

## Requirements

This script presuposes that you have a repo with a commit convention configuration as described above. If the commit conventions vary, the script has to be adpated to fit those conventions.

## Usage

### Commit Data

Inside a git repository, run

```shell
  node path/to/script/index commits.csv
```

This will output a `commits.csv` in the current directory.

### Commit Coventions Data

A second script can be used to extract commit conventions data from the local `.czrc` file:

```shell
  node path/to/script/commitTypes commit_types.csv
```

This will output a `commit_types.csv` in the current directory.

## JSON

An earlier version of the script output a JSON file under the follwing format:

```json
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
- know the contents and history of the repo you want to analyse
- have the necessary rights over the repository you will be manipulating
- have a backup of your repo in case anything goes wrong

## Resources

- Adapted from this article : [Git: Merge Repositories/replay commits on other repo](https://makandracards.com/markus/47974-git-merge-repositories-replay-commits-on-other-repo)
- Uses [ShellJS](https://documentup.com/shelljs/shelljs#) ("Unix shell commands for Node.js")
