const errors_common = require('./common/ui-form.cjs')
const errors_fr = require('./fr/ui-form.cjs')
const errors_en = require('./en/ui-form.cjs')
const errors_es = require('./es/ui-form.cjs')

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

module.exports = {L10nFormatter}
