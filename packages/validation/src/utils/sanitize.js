/**
 *  Simple sanitization functions to use before validation
 *
 */
import path from 'node:path'

function replaceChar(s) {
	return (
		{
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#39;',
			'`': '&#96;',
			'=': '&#61;',
			'/': '&#47;',
		}[s] ?? ''
	)
}

function sanitizePlainText(input) {
	if (typeof input !== 'string') return ''
	const sanitized = input.trim()
	if (sanitized === '') return sanitized
	// eslint-disable-next-line no-useless-escape
	return sanitized.replace(/[&<>"'`=\/]/g, replaceChar)
}

function sanitizeNumber(input) {
	return isNaN(input) ? null : input
}

function sanitizeEmail(input) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailRegex.test(input) ? input : ''
}

function sanitizeFilePath(input) {
	const sanitized = path.normalize(input).replace(/^(\.\.(\/|\\|$))+/, '')
	return sanitized
}

function sanitizeURL(input) {
	try {
		new URL(input)
		return input
	} catch {
		return ''
	}
}

function sanitizeDate(input) {
	return !isNaN(Date.parse(input))
}

function sanitizeForm(name, value, inputTypeMap) {
	// Retrieve input type from the mapping
	const inputType = inputTypeMap[name] || 'text' // Default to 'text' if not found

	// Sanitize input based on its type
	let sanitizedValue = ''
	if (inputType === 'password') {
		return value
	} else if (inputType === 'text') {
		sanitizedValue = sanitizePlainText(value)
	} else if (inputType === 'number') {
		sanitizedValue = sanitizeNumber(Number(value)) ? value : ''
	} else if (inputType === 'email') {
		sanitizedValue = sanitizeEmail(value) ? value : ''
	} else if (inputType === 'url') {
		sanitizedValue = sanitizeURL(value) ? value : ''
	} else if (inputType === 'date') {
		sanitizedValue = sanitizeDate(value) ? value : ''
	} else if (inputType === 'file') {
		sanitizedValue = sanitizeFilePath(value) ? value : ''
	}

	return sanitizedValue
}

export default {sanitizeForm, sanitizePlainText}
