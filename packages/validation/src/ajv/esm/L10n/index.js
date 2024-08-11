import errors_common from './common/ui-form.js'
import errors_fr from './fr/ui-form.js'
import errors_en from './en/ui-form.js'
import errors_es from './es/ui-form.js'

class L10nFormatter {
	/**
	 * Error messages for form validation
	 */
	locale
	errors = {
		common: errors_common,
		es: errors_es,
		fr: errors_fr,
		en: errors_en,
	}

	/**
	 * Initialize default sidebar object or from the user's cookie values, if any
	 */
	constructor(locale) {
		if (locale) this.locale = locale
	}

	getError(messages, key, ...args) {
		const ERRORS = messages.ERRORS
		const ERRORS_FUNCTIONS = messages.ERRORS_FUNCTIONS
		if (ERRORS[key]) {
			return ERRORS[key]
		}
		if (args.length && ERRORS_FUNCTIONS[key]) {
			return ERRORS_FUNCTIONS[key](...args)
		}
		return key
	}

	/**
	 * Update sidebar based on inputs
	 */
	getErrorMessage(key, ...args) {
		if (this.errors[this.locale]) {
			return this.getError(this.errors[this.locale], key, ...args)
		}
		return false
	}
}

export default L10nFormatter
