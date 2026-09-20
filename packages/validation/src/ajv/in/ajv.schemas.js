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

export const BaseSchema = {
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
	uuid: {
		type: 'string',
		pattern:
			'^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$',
		errorMessage: messages.getErrorMessage('FORMAT_PATTERN'),
	},
	readonly: {
		type: 'boolean',
	},
	date: {
		type: 'string',
		format: 'date',
	},
	date_time: {
		type: 'string',
		format: 'date-time',
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
				errorMessage: messages.getErrorMessage('FORMAT_PATTERN_MIN', 3),
			},
			{
				type: 'string',
				format: 'password',
				pattern: PATTERNS.PASSWORD_DIGITS,
				errorMessage: messages.getErrorMessage(
					'FORMAT_PATTERN_MIN',
					3,
					'digit',
				),
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
		pattern: 'on|true|([a-zA-Z]|-|[0-9])+',
		errorMessage: {
			minLength: messages.getErrorMessage('CHECKBOX_MIN', 1),
		},
	},
	radio: {
		type: 'string',
		pattern: 'on|true|([a-zA-Z]|-|[0-9])+',
		errorMessage: {
			minLength: messages.getErrorMessage('RADIO_PATTERN', 1),
		},
	},
	select: {type: 'string'},
	disabled_field: {type: 'string'},
	radio_group: {
		type: 'string',
		pattern: 'on|true|([a-zA-Z]|-|[0-9])+',
		errorMessage: {
			pattern: messages.getErrorMessage('RADIO_PATTERN', 200),
		},
	},
	checkbox_group: {
		type: 'string',
		pattern: 'on|true|([a-zA-Z]|-|[0-9])+',
		errorMessage: {
			pattern: messages.getErrorMessage('CHECKBOX_PATTERN', 200),
		},
	},
}

/**
 * Validation schema for the form: TestForm
 */
export const FormSchema = {
	$id: '#/definitions/FormSchema',
	$schema: 'http://json-schema.org/draft-07/schema#',
	type: 'object',
	properties: {
		text: {$ref: '#/definitions/text'},
		username: {$ref: '#/definitions/username'},
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
		textarea: {$ref: '#/definitions/textarea'},
		checkbox: {$ref: '#/definitions/checkbox'},
		radio: {$ref: '#/definitions/radio'},
		select: {$ref: '#/definitions/select'},
		disabled_field: {$ref: '#/definitions/disabled_field'},
		radio_group: {$ref: '#/definitions/radio_group'},
		checkbox_group: {$ref: '#/definitions/checkbox_group'},
	},
	definitions: BaseSchema,
}

export const RouteParamSchema = {
	$id: '#/definitions/RouteParamSchema',
	$schema: 'http://json-schema.org/draft-07/schema#',
	type: 'object',
	additionalProperties: false,
	required: ['name', 'type'],
	properties: {
		name: {
			type: 'string',
			minLength: 1,
			maxLength: 64,
			pattern: '^[A-Za-z_][A-Za-z0-9_-]*$',
			description: "Valid route param name. eg. 'language'",
		},
		type: {
			type: 'string',
			pattern: '^atomic|multiple|csv$',
			description:
				'Defines whether URL param value is a single string or an array of strings',
		},
	},
}

export const RouteSchema = {
	$id: '#/definitions/RouteSchema',
	$schema: 'http://json-schema.org/draft-07/schema#',
	type: 'object',
	description:
		"Valid [top+N]-level route id, e.g. '/doc/edit', with N between 1 and 3 (keeping it small)",
	additionalProperties: false,
	required: ['id', 'allowedParams'],
	properties: {
		id: {
			type: 'string',
			minLength: 1,
			maxLength: 260,
			pattern: '^/?([A-Za-z_][A-Za-z0-9_-]*\\/?){1,3}$',
			description: "Valid route id, e.g. 'edit'.",
		},
		allowedParams: {
			type: 'array',
			items: {$ref: '#/definitions/RouteParamSchema'},
			description: 'Defines parameters allowed in search query',
		},
	},
	definitions: {
		RouteParamSchema,
	},
}

export const NamespaceSchema = {
	$id: '#/definitions/NamespaceSchema',
	$schema: 'http://json-schema.org/draft-07/schema#',
	type: 'object',
	additionalProperties: false,
	required: ['namespace', 'route', 'children'],
	properties: {
		namespace: {
			type: 'string',
			minLength: 1,
			maxLength: 260,
			pattern: '^[A-Za-z_][A-Za-z0-9_-]*?$',
			description: "Valid top-level namespace id, e.g. 'doc'.",
		},
		route: {
			type: 'string',
			minLength: 1,
			maxLength: 260,
			pattern: '^/[A-Za-z_][A-Za-z0-9_-]*$',
			description: "Valid top-level route id, e.g. '/doc'.",
		},
		children: {
			type: 'array',
			description: 'Per-route configuration keyed by route name.',
			items: {$ref: '#/definitions/RouteSchema'},
		},
	},
	definitions: {
		RouteSchema,
	},
}
