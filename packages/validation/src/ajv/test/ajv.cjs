const fs = require('fs')
const path = require('path')
const Ajv = require('ajv')
const standaloneCode = require('ajv/dist/standalone').default

const schemaFoo = {
	$id: '#/definitions/Foo',
	$schema: 'http://json-schema.org/draft-07/schema#',
	type: 'object',
	properties: {
		foo: {$ref: '#/definitions/Bar'},
	},
}
const schemaBar = {
	$id: '#/definitions/Bar',
	$schema: 'http://json-schema.org/draft-07/schema#',
	type: 'object',
	properties: {
		bar: {type: 'string'},
	},
	required: ['bar'],
}

// For ESM, the export name needs to be a valid export name, it can not be `export const #/definitions/Foo = ...;` so we
// need to provide a mapping between a valid name and the $id field. Below will generate
// `export const Foo = ...;export const Bar = ...;`
// This mapping would not have been needed if the `$ids` was just `Bar` and `Foo` instead of `#/definitions/Foo`
// and `#/definitions/Bar` respectfully
const ajv = new Ajv({
	schemas: [schemaFoo, schemaBar],
	code: {source: true, esm: true},
})
let moduleCode = standaloneCode(ajv, {
	Foo: '#/definitions/Foo',
	Bar: '#/definitions/Bar',
})

// Now you can write the module code to file
fs.writeFileSync(path.join(__dirname, '../out/validate.ajv.mjs'), moduleCode)
