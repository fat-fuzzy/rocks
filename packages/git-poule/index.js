/**
 * Script to extract commit data from git history
 * The expected format for commits is the one defined in the current repository's cz-conventional-changelog (adapted)
 */
const shell = require('shelljs')
const fs = require('fs')

const COMMIT_HISTORY_FILE = 'commit-history.txt'
const COMMITS_JSON = 'commits.json'
const COMMITS_CSV = 'commits.csv'
const CZ_CONFIG_FILE = '.czrc'
let COMMIT_TYPES = []

if (!shell.which('git')) {
	shell.echo('Sorry, this script requires git')
	shell.exit(1)
}

// Run external tool (Git) synchronously
if (
	shell.exec(
		`git log --all --graph --pretty=format:'%C(yellow)%h %ct %an	%Creset	%s' > ${COMMIT_HISTORY_FILE}`,
	).code !== 0
) {
	shell.echo('Error: Git log failed')
	shell.exit(1)
}

fs.readFile(CZ_CONFIG_FILE, 'utf8', (err, data) => {
	if (err) {
		console.error(err)
		return
	}
	const czConfig = JSON.parse(data)

	if (czConfig?.types) {
		COMMIT_TYPES = Object.keys(czConfig.types).map((c) => c.trim())
	}
})

fs.readFile(COMMIT_HISTORY_FILE, 'utf8', (err, data) => {
	if (err) {
		console.error(err)
		return
	}

	const commits = data.split('\n')
	const hashRegex = /([a-z,\d]{7})/g
	const timestampRegex = /([\d]{10})/g
	const scopeRegex =
		/\[(\s?[a-z,\d]\s?\/?\+?\-?\_?){1,10}(\s?[a-z,\d]\s?\/?\+?\-?\_?){1,10}?\]/g

	const scopes = [
		'all',
		'root',
		'apps',
		'sandbox',
		'client',
		'play',
		'doc',
		'packages',
		'config',
		'design',
		'git-poule',
		'lib',
		'gfx',
		'markdown',
		'ui',
		'infra',
		'resources',
		'sketch',
		'style',
		'playbook',
		'validation',
		'validate',
		'intl',
	]
	const commitData = [
		[
			'"PR"',
			'"HASH"',
			'"TIMESTAMP"',
			'"DATE"',
			'"YEAR"',
			'"MONTH"',
			'"DAY"',
			'"TIME"',
			'"COMMIT_TYPE"',
			'"SCOPE"',
			...scopes.map((s) => `"SCOPE.${s}"`),
			'"DESCRIPTION"',
			'"AUTHOR"',
		],
	]
	commits.forEach((commit) => {
		// console.log(commit)
		let testCommit = commit
		let scope = null
		// Clean commits that for some reason (!) have a trailing `"` char
		if (testCommit[testCommit.length - 1] === '"') {
			testCommit = testCommit.substring(0, testCommit.length - 2)
		}
		let [meta, ...text] = testCommit.split(/\t/)
		text = text.join(' ').trim()

		if (meta !== '/' && text) {
			// 1. Extract HASH, TIMESTAMP and AUTHOR from log
			const [hash] = meta.match(hashRegex) /* Regex OK*/
			const [timestamp] = meta.match(timestampRegex) /* Regex OK*/
			const metaArray = meta.split(' ')
			const author = metaArray[metaArray.length - 1]

			// 2. Extract PR, COMMIT_TYPE, SCOPE, and DESCRIPTION from log
			let [commitType, ...description] = text.split(' ')

			// Split COMMIT_TYPE from SCOPE if there is no space between the two
			const commitTypeScoped = commitType.split('[')
			if (commitTypeScoped.length === 2) {
				commitType = commitTypeScoped[0].trim()
				scope = `[${commitTypeScoped[1].trim()}`
			}

			let descString
			let pr = null
			// Extract PR number if any
			if (commitType === 'Merge') {
				descString = description.join(' ')
				// Split PR from DESCRIPTION if this is a Merge commit
				let prMatch = descString.substring('pull request #'.length)
				if (prMatch) {
					description = prMatch.split(' ')
					pr = description[0]
					description.splice(0, 1)
					descString = description.join(' ')
					scope = null
				}
			} else {
				let descString = description.join(' ')

				// Test if the SCOPE is in the description
				let scopeMatch = descString.match(scopeRegex)
				if (scopeMatch) {
					// If there is a SCOPE match: remove it from the DESCRIPTION
					scope = scopeMatch[0]
					descString = descString.substring(scope.length)
				} else {
					// Test if the SCOPE is in the COMMIT_TYPE
					scopeMatch = commitType.match(scopeRegex)
					if (scopeMatch) {
						// If there is a SCOPE match: remove it from the COMMIT_TYPE
						scope = scopeMatch[0]
						commitType = commitType.substring(scope.length)
					}
					if (!scope) {
						// If scope does not match Regex: Test if DESCRIPTION contains a scope ending char : "]". If it does, split SCOPE from DESCRIPTION
						const descriptionScoped = descString.split(']')
						if (descriptionScoped.length == 2) {
							scope = `${descriptionScoped[0].trim()}]`
							descString = descriptionScoped[1].trim()
						}
					}

					if (scope !== null && !scope.match(scopeRegex)) {
						// If the current scope does not represent a true scope (i.e. the scope is just the first word of the description)
						// -> re-attach the false scope to the DESCRIPTION and set the SCOPE to null
						descString = `${String(scope)} ${descString}`
						scope = null
					}
				}
			}
			if (!descString) {
				descString = description.join(' ')
			}
			// Clean any SCOPE strings in descString
			if (scope && descString.match(scopeRegex)) {
				descString = descString.substring(scope.trim().length)
			}
			// Clean any SCOPE substring leftovers in descString
			let scopeLeftover = descString.match(/^([\w]*\])/g)
			if (scopeLeftover) {
				descString = descString.substring(scopeLeftover[0].length).trim()
			}

			let scopeValues
			if (scope) {
				// If there is a SCOPE match: remove the surrounding '[' and ']' characters
				scope = String(scope).substring(1, scope.length - 1)

				let scopeDetails = scope.split('+')
				// Parse scope string to extract multiple values
				if (scopeDetails.length > 1) {
					scopeValues = scopes.map((sv) => {
						let scopeTrimmed = sv.trim()
						if (scopeDetails.includes(scopeTrimmed)) {
							return 1
						} else {
							let scopeValueDetails = scopeTrimmed.split('/')
							if (scopeValueDetails.length > 1) {
								if (scopeValueDetails.includes(scopeTrimmed)) {
									return 1
								}
							}
						}
						return 0
					})
				} else {
					scopeDetails = scope.split('/')
					if (scopeDetails.length > 1) {
						scopeValues = scopes.map((sc) => {
							if (scopeDetails.includes(sc.trim())) {
								return 1
							} else {
								return 0
							}
						})
					} else {
						scopeValues = scopes.map((sc) => {
							if (scope === sc.trim()) {
								return 1
							} else {
								return 0
							}
						})
					}
				}
			}
			scope = scope ? `"${scope}"` : '-'
			if (!scopeValues) {
				scopeValues = []
				for (let i = 0; i < scopes.length; i++) {
					scopeValues[i] = 0
				}
			}

			let unixTimestamp = parseInt(timestamp, 10)
			let fullDate = new Date(unixTimestamp * 1000)
			let locale = 'fr-FR'

			const shortDate = new Intl.DateTimeFormat(locale, {
				dateStyle: 'short',
			})
			const shortTime = new Intl.DateTimeFormat(locale, {
				timeStyle: 'short',
			})
			const yearFormatter = new Intl.DateTimeFormat(locale, {
				year: 'numeric',
			})
			const monthFormatter = new Intl.DateTimeFormat(locale, {
				month: '2-digit',
			})
			const dayFormatter = new Intl.DateTimeFormat(locale, {
				day: 'numeric',
			})
			let date = shortDate.format(fullDate)
			let time = shortTime.format(fullDate)
			let year = yearFormatter.format(fullDate)
			let month = monthFormatter.format(fullDate)
			let day = dayFormatter.format(fullDate)

			pr = pr ? pr : '-'

			commitData.push([
				pr,
				`"${hash}"`,
				timestamp,
				date,
				year,
				month,
				day,
				time,
				`"${commitType}"`,
				scope,
				...scopeValues,
				`"${descString.trim()}"`,
				`"${author}"`,
			])
		}
	})

	// COMMITS_JSON
	// console.log(
	// 	`{
	//   "commits": [`,
	// )

	// for (let i = 0; i < commitData.length; i++) {
	// 	console.log(`[`)
	// 	console.log(commitData[i][0])
	// 	for (let j = 1; j < commitData[i].length; j++) {
	// 		console.log(`, ${commitData[i][j]}`)
	// 	}
	// 	if (i === commitData.length - 1) {
	// 		console.log(`]`)
	// 	} else {
	// 		console.log(`],`)
	// 	}
	// }
	// console.log(
	// 	`]
	// }`,
	// )

	// COMMITS_CSV
	for (let i = 0; i < commitData.length; i++) {
		console.log(commitData[i].join(';'))
	}
})

shell.rm(COMMIT_HISTORY_FILE)
