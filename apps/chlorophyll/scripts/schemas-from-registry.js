import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

import BaseSchema from '../src/schemas/primitives/Base.schema.js'

// Resolve relative to this script file
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(__dirname, '../src/lib/generated/ajv/')

// Shape 1: for AJV — each schema self-contained with its own $id
export async function generatedAjvSchemas(registry) {
	const schemas = Object.values(registry).flatMap((group) =>
		Object.entries(group).map(([name, {schema}]) => [
			name,
			{
				...schema,
				$id: schema?.$id?.startsWith('#/definitions/')
					? schema?.$id
					: `#/definitions/${name}`, // ensure $id present with '#/definitions/' prefix
				type: 'object',
				$schema: 'http://json-schema.org/draft-07/schema#',
				definitions: BaseSchema,
			},
		]),
	)

	const subDir = path.resolve(outDir, `./schemas`)
	fs.mkdirSync(subDir, {recursive: true}) // ensure directory exists

	// Compile each root schema independently

	for (const item of schemas) {
		const [name, schema] = item
		await fs.writeFileSync(
			path.join(subDir, `${name}.schema.json`),
			JSON.stringify(schema),
		)
	}
}

// Shape 2: for type generation — root schemas only, children anonymous in definitions
export function buildTypeSchemas(registry) {
	return Object.values(registry).flatMap((group) =>
		Object.entries(group)
			.filter(([, {isRoot}]) => isRoot) // only compile root schemas
			.map(([name, {schema}]) => ({name, schema})),
	)
}
