import {Locale} from '$types'

export type Message = string

export type MessageFunction = (...args: (string | number)[]) => string

export type ErrorMessages = {
	ERRORS: Record<string, string>
	ERRORS_FUNCTIONS: Record<string, MessageFunction>
}

export type Labels = {
	LABELS: Record<string, string>
}

export type L10nErrors = {
	[locale in Locale]: ErrorMessages
}

export type L10nLabels = {
	[locale in Locale]: Labels
}

export interface FormatErrors {
	locale: string
	errors: L10nErrors
	labels: L10nLabels
	getError(
		messages: ErrorMessages,
		key: string,
		...args: (string | number)[]
	): Message

	getErrorMessage(key: string, ...args: (string | number)[]): Message
}

export interface FormatDateTime {
	locale: string
	formatDateTime(date: Date, options: Intl.DateTimeFormatOptions): string
	createSimpleDateString(date: Date): string
}
