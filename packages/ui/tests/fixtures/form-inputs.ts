import fatFuzzyIntl from '@fat-fuzzy/intl'
import FormValidator from '$lib/utils/browser/FormValidator.svelte'

const {L10nFormatter} = fatFuzzyIntl
const messages = new L10nFormatter('en')

const INPUTS: {
	[name: string]: {
		legend?: string
		label: string
		type: string
		name: string
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
		name: 'sample_name',
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
		name: 'sample_phone',
		type: 'tel',
		value: {valid: '+380123456789', invalid: '123-456-7890'},
		errors: [messages.getErrorMessage('FORMAT_PHONE')],
	},
	sample_email: {
		label: 'Email',
		name: 'sample_email',
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
		name: 'sample_postcode',
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
		name: 'sample_checkbox',
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
		name: 'sample_disabled_field',
		type: 'text',
		value: {valid: 'disabled'},
		errors: [],
	},
	sample_radio_group: {
		legend: 'Radio Group',
		label: 'Unique Choice 1',
		name: 'sample_radio_group',
		type: 'radio',
		value: {valid: 'on'},
		errors: [messages.getErrorMessage('RADIO_PATTERN')],
	},
	sample_checkbox_group: {
		legend: 'Checkbox Group',
		label: 'Multiple Choice 1',
		name: 'sample_checkbox_group',
		type: 'checkbox',
		value: {valid: 'on'},
		errors: [messages.getErrorMessage('CHECKBOX_PATTERN')],
	},
	sample_password: {
		label: 'Password',
		name: 'sample_password',
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
		name: 'confirm_password',
		type: 'password',
		dependsOn: 'sample_password',
		value: {valid: 'ThisIsNotSecure!!!123', invalid: 'ThisIsNotSecure'},
		errors: [messages.getErrorMessage('MATCH_PASSWORD')],
	},
}

const SIGNUP_INPUTS: {
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
	sample_username: {
		label: 'Username',
		type: 'text',
		value: {valid: 'FatTheFuzzy', invalid: 'F'},
		errors: [
			messages.getErrorMessage('FORMAT_TEXT_MIN', 3),
			// messages.getErrorMessage('FORMAT_TEXT_MAX', 1000),
			// messages.getErrorMessage('FORMAT_USERNAME'),
		],
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

function getBasicInputFields() {
	const INPUT_PROPS = Object.values(INPUTS)
	const inputTypes = ['text', 'tel', 'email', 'password']

	return INPUT_PROPS.filter((i) => inputTypes.find((t) => t === i.type))
}

async function initFormDataWithSampleInputs(
	validator: FormValidator,
	state: 'valid' | 'invalid' | 'sanitized' | 'unsanitized',
) {
	const formData = new FormData()

	Object.keys(INPUTS).forEach((key) => {
		const input = INPUTS[key]
		if (state === 'valid' && input.value.valid) {
			formData.append(key, input.value.valid)
		} else if (state === 'invalid' && input.value.invalid) {
			formData.append(key, input.value.invalid)
		}
		if (state === 'sanitized') {
			if (input.value.sanitized) {
				formData.append(key, input.value.sanitized)
			} else {
				formData.append(key, input.value.valid)
			}
		} else if (state === 'unsanitized') {
			if (input.value.unsanitized) {
				formData.append(key, input.value.unsanitized)
			} else {
				formData.append(key, input.value.valid)
			}
		}
	})
	await validator.init(formData, getInputFields())
}

export {
	INPUTS,
	SIGNUP_INPUTS,
	getSampleInputFields,
	initFormDataWithSampleInputs,
	getBasicInputFields,
}
