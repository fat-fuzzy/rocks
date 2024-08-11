/************************************************************************************
 * This file contains JSON schema for form validation with Ajv
 *
 * AJV Doc on Combining Schemas: https://ajv.js.org/guide/combining-schemas.html
 ************************************************************************************/

import L10nFormatter from './L10n/index.js'

const messages = new L10nFormatter('en')
/**
 * Common Schemas for form inputs.
 * Adjust as necessary for your form.
 */
const schemaInputs = {
	text: {
		allOf: [
			{
				type: 'string',
				minLength: 3,
				errorMessage: messages.getErrorMessage('FORMAT_TEXT_MIN', 3),
			},
			{
				type: 'string',
				maxLength: 100,
				errorMessage: messages.getErrorMessage('FORMAT_TEXT_MAX', 100),
			},
		],
	},
	phone: {
		type: 'string',
		pattern: '[\\+0-9]{10,14}',
		errorMessage: {
			errorMessage: messages.getErrorMessage('FORMAT_PHONE'),
			pattern: 'Please enter a valid phone number',
		},
	},
	email: {
		type: 'string',
		format: 'email',
		errorMessage: {
			format: messages.getErrorMessage('FORMAT_EMAIL'),
		},
	},
	password: {
		/**
		 *  WARNING: This validates a pattern, but it does not guarantee a password is secure:
		 * * this will not check against a list of common passwords: 'password123!!!' will pass
		 * * this will not check against a list of compromised passwords
		 * * To learn more: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
		 * * Recommended for users:
		 *   * Use a password manager to generate and store passwords
		 *   * Add a second factor of authentication (2FA)
		 * If you are handling sensitive data, usage of a trusted service that provides additional security measures is recommended.
		 */
		allOf: [
			{
				type: 'string',
				format: 'password',
				minLength: 12,
				errorMessage: messages.getErrorMessage('FORMAT_TEXT_MIN', 12),
			},
			{
				type: 'string',
				format: 'password',
				pattern: '([$\\-+!?*&%~_@#]{1}[a-z|A-Z|0-9]{0,100}){3}',
				errorMessage: messages.getErrorMessage('FORMAT_PATTERN', 3),
			},
			{
				type: 'string',
				format: 'password',
				pattern: '([0-9]{1}[a-z|A-Z|0-9]{0,100}){3}',
				errorMessage: messages.getErrorMessage('FORMAT_PATTERN', 3, 'digit'),
			},
		],
	},
	postcode: {
		allOf: [
			{
				type: 'string',
				minLength: 5,
				errorMessage: messages.getErrorMessage('FORMAT_TEXT_MIN', 5),
			},
		],
	},
	textarea: {
		type: 'string',
		maxLength: 200,
		errorMessage: {
			maxLength: messages.getErrorMessage('FORMAT_TEXT_MIN', 200),
		},
	},
	checkbox: {
		type: 'string',
		pattern: 'on|true',
		errorMessage: {
			minLength: messages.getErrorMessage('CHECKBOX_MIN', 1),
		},
	},
	select: {type: 'string'},
	disabled_field: {type: 'string'},
	radio_group: {
		type: 'string',
		pattern: 'on|true',
		errorMessage: {
			pattern: messages.getErrorMessage('RADIO_PATTERN', 200),
		},
	},
	checkbox_group: {
		type: 'string',
		pattern: 'on|true',
		errorMessage: {
			pattern: messages.getErrorMessage('CHECKBOX_PATTERN', 200),
		},
	},
}

/**
 * Validation schema for the form: AjvValidator
 */
const schemaAjvValidator = {
	$id: '#/definitions/AjvValidator',
	$schema: 'http://json-schema.org/draft-07/schema#',
	type: 'object',
	properties: {
		sample_name: {$ref: '#/definitions/text'},
		sample_phone: {$ref: '#/definitions/phone'},
		sample_email: {$ref: '#/definitions/email'},
		sample_password: {$ref: '#/definitions/password'},
		confirm_password: {$ref: '#/definitions/confirm_password'},
		sample_postcode: {$ref: '#/definitions/postcode'},
		sample_description: {$ref: '#/definitions/textarea'},
		sample_checkbox: {$ref: '#/definitions/checkbox'},
		sample_select: {$ref: '#/definitions/select'},
		sample_disabled_field: {$ref: '#/definitions/disabled_field'},
		sample_radio_group: {$ref: '#/definitions/radio_group'},
		sample_checkbox_group: {$ref: '#/definitions/checkbox_group'},
	},
	required: ['sample_name', 'sample_email', 'sample_password'],
	definitions: schemaInputs,
}

/**
 * Validation schema for the form: SignUpValidator
 */
const schemaSignUp = {
	$id: '#/definitions/SignUpValidator',
	$schema: 'http://json-schema.org/draft-07/schema#',
	type: 'object',
	properties: {
		sample_email: {$ref: '#/definitions/email'},
		sample_password: {$ref: '#/definitions/password'},
		confirm_password: {
			type: 'string',
			const: {$data: '1/sample_password'},
			errorMessage: {
				const: 'Passwords do not match',
			},
		},
	},
	required: ['sample_email', 'sample_password'],
	definitions: schemaInputs,
}

export default {schemaInputs, schemaSignUp, schemaAjvValidator}
