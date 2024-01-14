/**
 * Script to extract commit type data from the current repository's cz-conventional-changelog configuration (adapted)
 */
const fs = require('fs')

const CZ_CONFIG_FILE = '.czrc'
let COMMIT_TYPES = []

fs.readFile(CZ_CONFIG_FILE, 'utf8', (err, data) => {
	if (err) {
		console.error(err)
		return
	}
	const czConfig = JSON.parse(data)

	if (czConfig?.types) {
		COMMIT_TYPES = Object.keys(czConfig.types)
	}
	const commitTypesData = [['"TYPE"', '"TITLE"', '"DESCRIPTION"']]

	COMMIT_TYPES.forEach((type) => {
		const data = czConfig.types[type]
		commitTypesData.push([`"${type.trim()}"`, `"${data.title}"`, `"${data.description}"`])
	})

	// COMIT_TYPES_CSV
	for (let i = 0; i < commitTypesData.length; i++) {
		let record = []
		for (let j = 0; j < commitTypesData[i].length; j++) {
			record[j] = commitTypesData[i][j]
		}
		console.log(record.join(';'))
	}
})
