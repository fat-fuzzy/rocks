import errors_common from '$lib/intl/L10n/common/ui-form.js'
import errors_fr from '$lib/intl/L10n/fr/ui-form.js'
import errors_en from '$lib/intl/L10n/en/ui-form.js'
import errors_es from '$lib/intl/L10n/es/ui-form.js'

export class L10nFormatter {
	/**
	 * Error messages for form validation
	 */
	private errors = {
		common: errors_common,
		es: errors_es,
		fr: errors_fr,
		en: errors_en,
	}

	/**
	 * Initialize default sidebar object or from the user's cookie values, if any
	 */
	constructor() {}

	getErrors(messages: any, key: string, ...args: unknown[]): string {
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
	geError(locale: 'fr' | 'en' | 'es', key: string, ...args: unknown[]) {
		if (this.errors[locale]) {
			return this.getErrors(this.errors[locale], key, ...args)
		}
		return false
	}
}
