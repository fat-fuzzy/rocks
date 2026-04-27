import fatFuzzyIntl from '@fat-fuzzy/intl'
import FormValidator from '$lib/utils/browser/FormValidator.svelte'

const {L10nFormatter} = fatFuzzyIntl
const messages = new L10nFormatter('en')

type InputItem = {
	label: string
	id: string
	value?: string
	disabled?: boolean
}

type InputProps = {
	[name: string]: {
		legend?: string
		label: string
		type: string
		name: string
		dependsOn?: string
		items?: InputItem[]
		value: {
			valid: string
			invalid?: string
			unsanitized?: string
			sanitized?: string
		}
		errors: string[]
	}
}

const INPUTS: InputProps = {
	name: {
		label: 'Username',
		name: 'name',
		type: 'text',
		value: {valid: 'Fat Fuzzy', invalid: 'F'},
		errors: [
			messages.getErrorMessage('FORMAT_TEXT_MIN', 3),
			// messages.getErrorMessage('FORMAT_TEXT_MAX', 1000),
			// messages.getErrorMessage('FORMAT_USERNAME'),
		],
	},
	phone: {
		label: 'Phone',
		name: 'phone',
		type: 'tel',
		value: {valid: '+380123456789', invalid: '123-456-7890'},
		errors: [messages.getErrorMessage('FORMAT_PHONE')],
	},
	email: {
		label: 'Email',
		name: 'email',
		type: 'email',
		value: {
			valid: 'bird@fat-fuzzy.rocks',
			invalid: 'bird@fat-fuzzy',
			unsanitized: '<script>bird@fat-fuzzy.rocks',
			sanitized: '&lt;script&gt;bird@fat-fuzzy.rocks',
		},
		errors: [messages.getErrorMessage('FORMAT_EMAIL')],
	},
	postcode: {
		label: 'Postcode',
		name: 'postcode',
		type: 'text',
		value: {valid: '75001', invalid: 'ABC'},
		errors: [messages.getErrorMessage('FORMAT_TEXT_MIN', 5)],
	},

	// TODO: enable textarea test after creating Textarea component
	// description: {
	// 	label: 'Description',
	// 	type: 'textarea',
	// 	value: {valid: 'Sample description'},
	// 	errors: [messages.getErrorMessage('FORMAT_TEXT_MAX', 200)],
	// },
	radio: {
		label: 'Radio',
		name: 'radio',
		type: 'radio',
		value: {valid: 'true'},
		errors: [messages.getErrorMessage('RADIO_MIN', 1)],
	},
	checkbox: {
		label: 'Checkbox',
		name: 'checkbox',
		type: 'checkbox',
		value: {valid: 'true'},
		errors: [messages.getErrorMessage('CHECKBOX_MIN', 1)],
	},
	// TODO: enable select test after creating Select component
	// select: {
	// 	label: 'Select',
	// 	type: 'select',
	// 	value: {valid: 'Option 1'},
	// 	errors: [],
	// },
	disabled_field: {
		label: 'Disabled Field',
		name: 'disabled_field',
		type: 'text',
		value: {valid: 'disabled'},
		errors: [],
	},
	radio_group: {
		legend: 'Radio Group',
		label: 'Radio Group',
		name: 'radio_group',
		type: 'radio',
		value: {valid: 'radio-2'},
		items: [
			{label: 'Radio 1', id: 'input-group.radio-1', value: 'radio-1'},
			{label: 'Radio 2', id: 'input-group.radio-2', value: 'radio-2'},
			{label: 'Radio 3', id: 'input-group.radio-3', value: 'radio-3'},
			{
				label: 'Radio 4',
				id: 'input-group.radio-4',
				value: 'radio-4',
				disabled: true,
			},
			{label: 'Radio 5', id: 'input-group.radio-5', value: 'radio-5'},
			{label: 'Radio 6', id: 'input-group.radio-6', value: 'radio-6'},
		],
		errors: [messages.getErrorMessage('RADIO_PATTERN')],
	},
	checkbox_group: {
		legend: 'Checkbox Group',
		label: 'Checkbox Group',
		name: 'checkbox_group',
		type: 'checkbox',
		value: {valid: 'check-2'},
		items: [
			{label: 'Checkbox 1', id: 'check-1', value: 'check-1'},
			{label: 'Checkbox 2', id: 'check-2', value: 'check-2'},
			{
				label: 'Checkbox 3',
				id: 'input-group.check-3',
				value: 'check-3',
				disabled: true,
			},
		],
		errors: [messages.getErrorMessage('CHECKBOX_PATTERN')],
	},
	checkbox_group_select_all: {
		legend: 'Checkbox Group - Select All',
		label: 'Checkbox Group - Select All',
		name: 'checkbox_group_select_all',
		type: 'checkbox',
		value: {valid: 'check-2'},
		items: [
			{label: 'Checkbox 1', id: 'check-1', value: 'check-1'},
			{label: 'Checkbox 2', id: 'check-2', value: 'check-2'},
			{
				label: 'Checkbox 3',
				id: 'input-group.check-3',
				value: 'check-3',
				disabled: true,
			},
			{label: 'Checkbox 4', id: 'input-group.check-4', value: 'check-4'},
			{label: 'Checkbox 5', id: 'input-group.check-5', value: 'check-5'},
			{label: 'Checkbox 6', id: 'input-group.check-6', value: 'check-6'},
		],
		errors: [messages.getErrorMessage('CHECKBOX_PATTERN')],
	},
	password: {
		label: 'Password',
		name: 'password',
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
		dependsOn: 'password',
		value: {valid: 'ThisIsNotSecure!!!123', invalid: 'ThisIsNotSecure'},
		errors: [messages.getErrorMessage('MATCH_PASSWORD')],
	},
}

const SIGNUP_INPUTS: InputProps = {
	username: {
		label: 'Username',
		type: 'text',
		name: 'username',
		value: {valid: 'FatTheFuzzy', invalid: 'F'},
		errors: [
			messages.getErrorMessage('FORMAT_TEXT_MIN', 3),
			// messages.getErrorMessage('FORMAT_TEXT_MAX', 1000),
			// messages.getErrorMessage('FORMAT_USERNAME'),
		],
	},
	email: INPUTS.email,
	password: INPUTS.password,
	confirm_password: INPUTS.confirm_password,
}

function getSampleInputFields() {
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
	await validator.init(formData, getSampleInputFields())
}

export {
	INPUTS,
	SIGNUP_INPUTS,
	getSampleInputFields,
	initFormDataWithSampleInputs,
	getBasicInputFields,
}
