import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {compile} from 'json-schema-to-typescript'

import {schemas} from '../src/schemas/Chlorophyll.registry.js'
import {buildTypeSchemas} from './schemas-from-registry.js'

// Resolve relative to this script file
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(__dirname, '../src/lib/generated/types')

const compileOptions = {
	unreachableDefinitions: false,
	$refOptions: {
		dereference: {
			circular: false,
		},
		resolve: {
			file: {
				// tell the ref parser where to resolve relative $refs from
				read: (file) => {
					const filePath = path.resolve(__dirname, file.url)
					return fs.readFileSync(filePath, 'utf-8')
				},
			},
		},
	},
}

function verifySchemas(schemas) {
	// Debug: find schemas with missing or empty $id
	const invalid = schemas.filter(
		({schema}) => !schema.$id || schema.$id.trim() === '',
	)

	if (invalid.length > 0) {
		console.error('Schemas with missing $id:')
		invalid.forEach(({schema}) =>
			console.error(JSON.stringify(schema, null, 2)),
		)
		process.exit(1)
	}

	const ids = schemas.map(({schema}) => schema.$id)
	const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i)

	if (duplicates.length > 0) {
		console.error('Duplicate $id values:', duplicates)
		process.exit(1)
	}
}

async function generateTypes(schemas) {
	// 1. Check schemas for errors
	const typeSchemas = buildTypeSchemas(schemas)
	verifySchemas(typeSchemas)

	// 2. Compile each root schema independently

	fs.mkdirSync(outDir, {recursive: true})

	for (const item of typeSchemas) {
		const {schema, name} = item
		const ts = await compile(schema, name, compileOptions)
		fs.writeFileSync(path.join(outDir, `${name}.ts`), ts)
	}
}

await generateTypes(schemas)
