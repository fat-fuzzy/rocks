import type {Message, MessageFunction} from '$types'

const maxLengthErrorMessage: MessageFunction = (maxLength) => {
	return `${maxLength} character${Number(maxLength) > 1 ? 's' : ''} maximum`
}

const minLengthErrorMessage: MessageFunction = (minLength) => {
	return `${minLength} character${Number(minLength) > 1 ? 's' : ''} minimum`
}

const patternMinErrorMessage: MessageFunction = (minChars, charType) => {
	let testType = charType
	if (!testType) {
		testType = 'special character'
	}
	return `${minChars} ${testType}${Number(minChars) > 1 ? 's' : ''} minimum`
}

const minChoiceErrorMessage: MessageFunction = (minLength) => {
	return `Please select at least ${minLength} option${Number(minLength) > 1 ? 's' : ''}`
}

const ERRORS: Record<string, Message> = {
	FORMAT_PATTERN: 'Data does not match required pattern',
	FORMAT_EMAIL: 'Please enter a valid email',
	FORMAT_PHONE: 'Please enter a valid phone number',
	FORMAT_POSTCODE: 'Please enter a valid postcode',
	FORMAT_USERNAME:
		'Characters allowed: alphanumeric characters, hyphens (-), periods (.), underscores (_)',
	CHECKBOX_PATTERN: 'Please choose at least one option',
	RADIO_PATTERN: 'Please select an option',
	MATCH_PASSWORD: 'Passwords do not match',
}

const ERRORS_FUNCTIONS: Record<string, MessageFunction> = {
	FORMAT_PATTERN_MIN: patternMinErrorMessage,
	FORMAT_TEXT_MIN: minLengthErrorMessage,
	FORMAT_TEXT_MAX: maxLengthErrorMessage,
	CHECKBOX_MIN: minChoiceErrorMessage,
}

export default {
	ERRORS,
	ERRORS_FUNCTIONS,
}
