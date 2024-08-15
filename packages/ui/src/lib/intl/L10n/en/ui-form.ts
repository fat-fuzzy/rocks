const maxLengthErrorMessage = (maxLength: number) => {
	return `${maxLength} character${maxLength > 1 ? 's' : ''}  maximum`
}

const minLengthErrorMessage = (minLength: number) => {
	return `${minLength} character${minLength > 1 ? 's' : ''} minimum`
}

const specialCharErrorMessage = (minChars: number, charType?: string) => {
	if (!charType) {
		return `Please use at least ${minChars} special characters`
	}
	return `Please use at least ${minChars} ${charType} character${minChars > 1 ? 's' : ''}`
}

const minChoiceErrorMessage = (minLength: number) => {
	return `Please select at least ${minLength} option${minLength > 1 ? 's' : ''}`
}

const ERRORS: {[key: string]: string} = {
	FORMAT_EMAIL: 'Please enter a valid email address',
	FORMAT_PHONE: 'Please enter a valid phone number',
	FORMAT_POSTCODE: 'Please enter a valid email address',
}

const ERRORS_FUNCTIONS: {
	[key: string]: (args: number, arg1: string | undefined) => string
} = {
	FORMAT_PASSWORD_PATTERN: specialCharErrorMessage,
	FORMAT_TEXT_MIN: minLengthErrorMessage,
	FORMAT_TEXT_MAX: maxLengthErrorMessage,
	CHECKBOX_LENGTH: minChoiceErrorMessage,
	CHECKBOX_PATTERN: () => 'Please choose at least one option',
	RADIO_PATTERN: () => 'Please select an option',
}

export default {
	ERRORS,
	ERRORS_FUNCTIONS,
}
