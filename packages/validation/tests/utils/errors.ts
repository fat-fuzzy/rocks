import fatFuzzyIntl from '@fat-fuzzy/intl'

const {L10nFormatter} = fatFuzzyIntl

const messages = new L10nFormatter('en')

const validationErrors: {
	[key: string]: {
		input: string
		testFn?: () => Promise<unknown>
		message: () => string
	}
} = {
	sample_username: {
		input: 'a.6',
		message: () => messages.getError('FORMAT_USERNAME'),
	},
}

export default {validationErrors}
