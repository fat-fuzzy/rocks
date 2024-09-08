import type {Message, MessageFunction} from '$types'

const maxLengthErrorMessage: MessageFunction = (maxLength) => {
	return `Máximo ${maxLength} carácter${Number(maxLength) > 1 ? 'es' : ''}`
}

const minLengthErrorMessage: MessageFunction = (minLength) => {
	return `Mínimo ${minLength} carácter${Number(minLength) > 1 ? 'es' : ''}`
}

const patternErrorMessage: MessageFunction = (minChars, charType) => {
	let testType = charType
	let testTypeSuffix = ''
	if (!testType) {
		testType = 'carácter'
		testTypeSuffix = 'espécial'
	}
	return `Mínimo ${minChars} ${testType}${Number(minChars) > 1 ? 'es' : testTypeSuffix}${testTypeSuffix && Number(minChars) > 1 ? 'es' : ''}`
}

const minChoiceErrorMessage: MessageFunction = (minLength) => {
	return `Selecciona al menos ${minLength} option${Number(minLength) > 1 ? 'es' : ''}`
}

const ERRORS: Record<string, Message> = {
	FORMAT_EMAIL: 'Por favor, utiliza un email válido',
	FORMAT_PHONE: 'Por favor, utiliza un número de teléfono válido',
	FORMAT_POSTCODE: 'Por favor, utiliza un código postal válido',
	FORMAT_USERNAME:
		'Carácteres permitidos: carácteres alfanuméricos, guiones (-), puntos (.), guiones bajos (_)',
	CHECKBOX_PATTERN: 'Por favor, selecciona al menos una opción',
	RADIO_PATTERN: 'Por favor, selecciona una opción',
	MATCH_PASSWORD: 'Las contraseñas no coinciden',
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
