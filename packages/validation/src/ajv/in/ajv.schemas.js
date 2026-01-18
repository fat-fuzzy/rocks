/************************************************************************************
 * This file contains JSON schema for form validation with Ajv
 *
 * AJV Doc on Combining Schemas: https://ajv.js.org/guide/combining-schemas.html
 ************************************************************************************/

import fatFuzzyIntl from '@fat-fuzzy/intl'
import constants from '../../utils/constants.js'

const {L10nFormatter} = fatFuzzyIntl
const messages = new L10nFormatter('en')
const {PATTERNS} = constants
/**
 * Common Schemas for form inputs.
 * Adjust as necessary for your form.
 * TODO: https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html#implementing-input-validation
 */

// TODO: File inputs
// https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html#file-upload-validation

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
	username: {
		allOf: [
			{
				type: 'string',
				minLength: 3,
				errorMessage: messages.getErrorMessage('FORMAT_TEXT_MIN', 3),
			},
			{
				type: 'string',
				maxLength: 1000,
				errorMessage: messages.getErrorMessage('FORMAT_TEXT_MAX', 1000),
			},
			{
				type: 'string',
				pattern: PATTERNS.USERNAME,
				errorMessage: messages.getErrorMessage('FORMAT_USERNAME'),
			},
		],
	},
	phone: {
		type: 'string',
		pattern: PATTERNS.PHONE,
		errorMessage: messages.getErrorMessage('FORMAT_PHONE'),
	},
	// See: https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html#email-address-validation
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
		 * TODO: in backend
		 * - https://www.npmjs.com/package/@zxcvbn-ts/core
		 * - https://haveibeenpwned.com/API/v3#PwnedPasswords
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
				maxLength: 1000,
				errorMessage: messages.getErrorMessage('FORMAT_TEXT_MAX', 1000),
			},
			{
				type: 'string',
				format: 'password',
				pattern: PATTERNS.PASSWORD_SPECIAL_CHARS,
				errorMessage: messages.getErrorMessage('FORMAT_PATTERN', 3),
			},
			{
				type: 'string',
				format: 'password',
				pattern: PATTERNS.PASSWORD_DIGITS,
				errorMessage: messages.getErrorMessage('FORMAT_PATTERN', 3, 'digit'),
			},
		],
	},
	confirm_password: {
		type: 'string',
		const: {$data: '1/password'},
		errorMessage: {
			const: messages.getErrorMessage('MATCH_PASSWORD'),
		},
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
			maxLength: messages.getErrorMessage('FORMAT_TEXT_MAX', 200),
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
 * Validation schema for the form: TestForm
 */
const schemaTestForm = {
	$id: '#/definitions/TestFormSchema',
	$schema: 'http://json-schema.org/draft-07/schema#',
	type: 'object',
	properties: {
		sample_name: {$ref: '#/definitions/text'},
		sample_phone: {$ref: '#/definitions/phone'},
		sample_email: {$ref: '#/definitions/email'},
		sample_password: {$ref: '#/definitions/password'},
		confirm_password: {
			type: 'string',
			const: {$data: '1/sample_password'},
			errorMessage: {
				const: messages.getErrorMessage('MATCH_PASSWORD'),
			},
		},
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
 * Validation schema for the form: SignUpSchema
 */
const schemaSignUp = {
	$id: '#/definitions/SignUpSchema',
	$schema: 'http://json-schema.org/draft-07/schema#',
	type: 'object',
	properties: {
		sample_username: {$ref: '#/definitions/username'},
		sample_email: {$ref: '#/definitions/email'},
		sample_password: {$ref: '#/definitions/password'},
		confirm_password: {
			type: 'string',
			const: {$data: '1/sample_password'},
			errorMessage: {
				const: messages.getErrorMessage('MATCH_PASSWORD'),
			},
		},
	},
	required: ['sample_username', 'sample_email', 'sample_password'],
	definitions: schemaInputs,
}

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
	definitions: schemaInputs,
}

/**
 * Validation schema for Cookie Preferences.
 */
const schemaCookiePreferences = {
	$id: '#/definitions/CookiePreferencesSchema',
	$schema: 'http://json-schema.org/draft-07/schema#',
	type: 'object',
	properties: {
		functional: {$ref: '#/definitions/checkbox'},
		legitimateInterest: {$ref: '#/definitions/checkbox'},
	},
	definitions: schemaInputs,
}

export default {
	schemaInputs,
	schemaSignUp,
	schemaUiState,
	schemaCookiePreferences,
	schemaTestForm,
}
