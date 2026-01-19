import fatFuzzyIntl from '@fat-fuzzy/intl'
import FormValidator from '$lib/utils/browser/FormValidator.svelte'

const {L10nFormatter} = fatFuzzyIntl
const messages = new L10nFormatter('en')

const INPUTS: {
	[name: string]: {
		label: string
		type: string
		dependsOn?: string
		value: {
			valid: string
			invalid?: string
			unsanitized?: string
			sanitized?: string
		}
		errors: string[]
	}
} = {
	sample_name: {
		label: 'Username',
		type: 'text',
		value: {valid: 'Fat Fuzzy', invalid: 'F'},
		errors: [
			messages.getErrorMessage('FORMAT_TEXT_MIN', 3),
			// messages.getErrorMessage('FORMAT_TEXT_MAX', 1000),
			// messages.getErrorMessage('FORMAT_USERNAME'),
		],
	},
	sample_phone: {
		label: 'Phone',
		type: 'tel',
		value: {valid: '+380123456789', invalid: '123-456-7890'},
		errors: [messages.getErrorMessage('FORMAT_PHONE')],
	},
	sample_email: {
		label: 'Email',
		type: 'email',
		value: {
			valid: 'bird@fat-fuzzy.rocks',
			invalid: 'bird@fat-fuzzy',
			unsanitized: '<script>bird@fat-fuzzy.rocks',
			sanitized: '&lt;script&gt;bird@fat-fuzzy.rocks',
		},
		errors: [messages.getErrorMessage('FORMAT_EMAIL')],
	},
	sample_postcode: {
		label: 'Postcode',
		type: 'text',
		value: {valid: '75001', invalid: 'ABC'},
		errors: [messages.getErrorMessage('FORMAT_TEXT_MIN', 5)],
	},

	// TODO: enable textarea test after creating Textarea component
	// sample_description: {
	// 	label: 'Description',
	// 	type: 'textarea',
	// 	value: {valid: 'Sample description'},
	// 	errors: [messages.getErrorMessage('FORMAT_TEXT_MAX', 200)],
	// },
	sample_checkbox: {
		label: 'Checkbox',
		type: 'checkbox',
		value: {valid: 'on'},
		errors: [messages.getErrorMessage('CHECKBOX_MIN', 1)],
	},
	// TODO: enable select test after creating Select component
	// sample_select: {
	// 	label: 'Select',
	// 	type: 'select',
	// 	value: {valid: 'Option 1'},
	// 	errors: [],
	// },
	sample_disabled_field: {
		label: 'Disabled Field',
		type: 'text',
		value: {valid: 'disabled'},
		errors: [],
	},
	sample_radio_group: {
		label: 'Unique Choice 1',
		type: 'radio',
		value: {valid: 'on'},
		errors: [messages.getErrorMessage('RADIO_PATTERN')],
	},
	sample_checkbox_group: {
		label: 'Multiple Choice 1',
		type: 'checkbox',
		value: {valid: 'on'},
		errors: [messages.getErrorMessage('CHECKBOX_PATTERN')],
	},
	sample_password: {
		label: 'Password',
		type: 'password',
		value: {valid: 'ThisIsNotSecure!!!123', invalid: 'pwd'},
		errors: [
			messages.getErrorMessage('FORMAT_TEXT_MIN', 12),
			messages.getErrorMessage('FORMAT_PATTERN', 3),
			messages.getErrorMessage('FORMAT_PATTERN', 3, 'digit'),
		],
	},
	confirm_password: {
		label: 'Confirm Pwd',
		type: 'password',
		dependsOn: 'sample_password',
		value: {valid: 'ThisIsNotSecure!!!123', invalid: 'ThisIsNotSecure'},
		errors: [messages.getErrorMessage('MATCH_PASSWORD')],
	},
}

function getInputFields() {
	return Object.keys(INPUTS)
		.map((key) => ({
			[key]: INPUTS[key].type,
		}))
		.reduce((acc, curr) => ({...acc, ...curr}), {})
}

async function initFormDataWithInputs(
	validator: FormValidator,
	type: 'valid' | 'invalid' | 'sanitized' | 'unsanitized',
) {
	const formData = new FormData()

	Object.keys(INPUTS).forEach((key) => {
		const input = INPUTS[key]
		if (type === 'valid' && input.value.valid) {
			formData.append(key, input.value.valid)
		} else if (type === 'invalid' && input.value.invalid) {
			formData.append(key, input.value.invalid)
		}
		if (type === 'sanitized') {
			if (input.value.sanitized) {
				formData.append(key, input.value.sanitized)
			} else {
				formData.append(key, input.value.valid)
			}
		} else if (type === 'unsanitized') {
			if (input.value.unsanitized) {
				formData.append(key, input.value.unsanitized)
			} else {
				formData.append(key, input.value.valid)
			}
		}
	})
	await validator.init(formData, getInputFields())
}

export {INPUTS, getInputFields, initFormDataWithInputs}
