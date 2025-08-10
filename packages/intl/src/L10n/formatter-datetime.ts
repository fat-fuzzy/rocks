import type {FormatDateTime} from '$types'
import {Locale} from '../types/enums.js'

class DatetimeFormatter implements FormatDateTime {
	/**
	 * Error messages for form validation
	 */
	locale = Locale.en

	constructor(locale: Locale) {
		if (locale) this.locale = locale
	}

	formatDateTime(date: Date, options: Intl.DateTimeFormatOptions): string {
		return new Intl.DateTimeFormat(this.locale, options).format(date)
	}

	/**
	 * Formats a date to a string in the format "YYYY-MM-DD HH:mm:ss.SSS"
	 * @param {Date} date - The date to format.
	 */
	createSimpleDateString(date: Date): string {
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
			fractionalSecondDigits: 3,
		}

		const dateParts = new Intl.DateTimeFormat([], options)
			.formatToParts(date)
			.filter((part) => part.type !== 'literal')
		const dateString = dateParts
			.splice(0, 3) // year, month, day
			.reverse()
			.map((part) => part.value)
			.join('-')

		// const dateTime = dateParts // hour, minute, second, fractionalSecondDigits
		// 	.map((part, i) => {
		// 		return i === 0
		// 			? `h${part.value}`
		// 			: i === 1
		// 				? `m${part.value}`
		// 				: i === 2
		// 					? `s${part.value}`
		// 					: `ms${part.value}`
		// 	})
		// 	.join('')

		return dateString
	}
}

export default DatetimeFormatter
