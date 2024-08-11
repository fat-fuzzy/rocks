/************************************************************************************
 * This file contains JSON schema for form validation with Ajv
 *
 * AJV Doc on Combining Schemas: https://ajv.js.org/guide/combining-schemas.html
 ************************************************************************************/

const formatter = require('./L10n/index.cjs')

const messages = new formatter.L10nFormatter('en')
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
		// TODO:Adapt for better password strength validation
		// See: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
		allOf: [
			{
				type: 'string',
				format: 'password',
				minLength: 12,
				errorMessage: messages.getErrorMessage('FORMAT_TEXT_MIN', 12),
			},
			{
				type: 'string',
				pattern: '[$\\-+!?*&%~_@#]{1}',
				errorMessage: messages.getErrorMessage('FORMAT_PATTERN', 3),
			},
			{
				type: 'string',
				pattern: '[0-9]{1}',
				errorMessage: '1 chiffre minimum',
				errorMessage: messages.getErrorMessage('FORMAT_PATTERN', 3, 'chiffre'),
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
			{
				type: 'string',
				maxLength: 5,
				errorMessage: messages.getErrorMessage('FORMAT_TEXT_MIN', 5),
			},
		],
	},
	textarea: {
		type: 'string',
		maxLength: 200,
		errorMessage: {
			errorMessage: messages.getErrorMessage('FORMAT_TEXT_MIN', 200),
		},
	},
	checkbox: {
		type: 'string',
		pattern: 'on|true',
		errorMessage: {
			maxLength: messages.getErrorMessage('CHECKBOX_LENGTH', 2),
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
 * Validation schema for the form: DsrcFormValidator
 */
const schemaAjvValidator = {
	$id: '#/definitions/AjvValidator',
	type: 'object',
	properties: {
		sample_name: {$ref: '#/definitions/text'},
		sample_phone: {$ref: '#/definitions/phone'},
		sample_email: {$ref: '#/definitions/email'},
		sample_password: {$ref: '#/definitions/password'},
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
 * Validation schema for the form: DsrcFormValidator
 */
const schemaSignUp = {
	$id: '#/definitions/SignUpValidator',
	type: 'object',
	properties: {
		sample_email: {$ref: '#/definitions/email'},
		sample_password: {$ref: '#/definitions/password'},
	},
	required: ['sample_email', 'sample_password'],
	definitions: schemaInputs,
}

module.exports = {schemaInputs, schemaSignUp, schemaAjvValidator}
