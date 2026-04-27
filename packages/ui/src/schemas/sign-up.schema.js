import fatFuzzyIntl from '@fat-fuzzy/intl'
import {schemas} from '@fat-fuzzy/validation'

const {L10nFormatter} = fatFuzzyIntl
const messages = new L10nFormatter('en')
/**
 * Validation schema for the form: SignUpSchema
 */
const schemaSignUp = {
	$id: '#/definitions/SignUpSchema',
	$schema: 'http://json-schema.org/draft-07/schema#',
	type: 'object',
	properties: {
		username: {$ref: '#/definitions/username'},
		email: {$ref: '#/definitions/email'},
		password: {$ref: '#/definitions/password'},
		confirm_password: {
			type: 'string',
			const: {$data: '1/password'},
			errorMessage: {
				const: messages.getErrorMessage('MATCH_PASSWORD'),
			},
		},
	},
	required: ['username', 'email', 'password'],
	definitions: schemas.schemaInputs,
}

export default schemaSignUp
