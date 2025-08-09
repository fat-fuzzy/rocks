import type {FormatErrors, ErrorMessages} from '$types'
import {Locale} from '../types/enums.js'
import errors_en from './en/ui-form-errors.js'
import labels_en from './en/ui-form-labels.js'

class L10nFormatter implements FormatErrors {
	/**
	 * Error messages for form validation
	 */
	locale = Locale.en
	errors = {
		// es: errors_es,
		// fr: errors_fr,
		en: errors_en,
	}

	labels = {
		// es: errors_es,
		// fr: errors_fr,
		en: labels_en,
	}

	constructor(locale: Locale) {
		if (locale) this.locale = locale
	}

	getError(
		messages: ErrorMessages,
		key: string,
		...args: (string | number)[]
	): string {
		const ERRORS = messages.ERRORS
		const ERRORS_FUNCTIONS = messages.ERRORS_FUNCTIONS
		if (ERRORS[key]) {
			return ERRORS[key]
		}
		if (args.length && ERRORS_FUNCTIONS[key]) {
			return ERRORS_FUNCTIONS[key](...args)
		}

		// Default return message key if no localized message is found
		return key
	}

	getErrorMessage(key: string, ...args: (string | number)[]) {
		if (this.errors[this.locale]) {
			return this.getError(this.errors[this.locale], key, ...args)
		}

		// Default return message key if no localized message is found
		return key
	}
}

export default L10nFormatter
