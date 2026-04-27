import fatFuzzyIntl from '@fat-fuzzy/intl'
import {schemas} from '@fat-fuzzy/validation'

const {L10nFormatter} = fatFuzzyIntl
const messages = new L10nFormatter('en')

/**
 * Validation schema for the form: TestForm
 */
const schemaTestForm = {
	$id: '#/definitions/TestFormSchema',
	$schema: 'http://json-schema.org/draft-07/schema#',
	type: 'object',
	properties: {
		name: {$ref: '#/definitions/text'},
		phone: {$ref: '#/definitions/phone'},
		email: {$ref: '#/definitions/email'},
		password: {$ref: '#/definitions/password'},
		confirm_password: {
			type: 'string',
			const: {$data: '1/password'},
			errorMessage: {
				const: messages.getErrorMessage('MATCH_PASSWORD'),
			},
		},
		postcode: {$ref: '#/definitions/postcode'},
		description: {$ref: '#/definitions/textarea'},
		checkbox: {$ref: '#/definitions/checkbox'},
		select: {$ref: '#/definitions/select'},
		disabled_field: {$ref: '#/definitions/disabled_field'},
		radio_group: {$ref: '#/definitions/radio_group'},
		checkbox_group: {$ref: '#/definitions/checkbox_group'},
	},
	required: ['name', 'email', 'password'],
	definitions: schemas.schemaInputs,
}

export default schemaTestForm
