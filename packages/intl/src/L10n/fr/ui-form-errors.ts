import type {Message, MessageFunction} from '$types'

const maxLengthErrorMessage: MessageFunction = (maxLength) => {
	return `${maxLength} caractère${Number(maxLength) > 1 ? 's' : ''} maximum`
}

const minLengthErrorMessage: MessageFunction = (minLength) => {
	return `${minLength} caractère${Number(minLength) > 1 ? 's' : ''} minimum`
}

const patternErrorMessage: MessageFunction = (minChars, charType) => {
	let testType = charType
	let testTypeSuffix = ''
	if (!testType) {
		testType = 'caractère'
		testTypeSuffix = 'spécial'
	}
	return `${minChars} ${testType}${Number(minChars) > 1 ? 's' : testTypeSuffix}${testTypeSuffix && Number(minChars) > 1 ? 'es' : ''} minimum`
}

const minChoiceErrorMessage: MessageFunction = (minLength) => {
	return `Veuillez sélectionner au moins ${minLength} option${Number(minLength) > 1 ? 'es' : ''}`
}

const ERRORS: Record<string, Message> = {
	FORMAT_EMAIL: 'Veuillez entrer une adresse email valide',
	FORMAT_PHONE: 'Veuillez entrer un numéro de téléphone valide',
	FORMAT_POSTCODE: 'Veuillez entrer un code postal valide',
	FORMAT_USERNAME:
		'Carractères autorisés: carractères alphanumériques, tirets (-), points (.), tirets bas (_)',
	CHECKBOX_PATTERN: 'Veuillez choisir au moins une option',
	RADIO_PATTERN: 'Veuillez sélectionner une option',
	MATCH_PASSWORD: 'Les mots de passe ne correspondent pas',
}

const ERRORS_FUNCTIONS: Record<string, MessageFunction> = {
	FORMAT_PATTERN: patternErrorMessage,
	FORMAT_TEXT_MIN: minLengthErrorMessage,
	FORMAT_TEXT_MAX: maxLengthErrorMessage,
	CHECKBOX_MIN: minChoiceErrorMessage,
}

export default {
	ERRORS,
	ERRORS_FUNCTIONS,
}
