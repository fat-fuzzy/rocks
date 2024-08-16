import {Locale} from '$types'

export type Message = string

export type MessageFunction = (...args: (string | number)[]) => string

export type Errors = {
	ERRORS: Record<string, string>
	ERRORS_FUNCTIONS: Record<string, MessageFunction>
}

export type Labels = {
	LABELS: Record<string, string>
}

export type L10nErrors = {
	[locale in Locale]: Errors
}

export type L10nLabels = {
	[locale in Locale]: Labels
}

export interface Formatter {
	locale: string
	errors: L10nErrors
	labels: L10nLabels
	getError(messages: Errors, key: string, ...args: (string | number)[]): Message

	getErrorMessage(key: string, ...args: (string | number)[]): Message
}
