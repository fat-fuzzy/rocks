/**
 * Validation schema for UI states.
 */
const schemaUiState = {
	$id: '#/definitions/UiStateSchema',
	$schema: 'http://json-schema.org/draft-07/schema#',
	type: 'object',
	properties: {
		formId: {$ref: '#/definitions/text'},
		state: {$ref: '#/definitions/text'},
	},
	required: ['formId', 'state'],
	definitions: '#/definitions/FormInputsSchema',
}

export default schemaUiState
