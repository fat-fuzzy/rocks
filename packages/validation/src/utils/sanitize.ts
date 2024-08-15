/**
 *  Simple sanitization functions to use before validation
 *
 */
import path from 'path'

function replaceChar(s: string): string {
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

// Simple plain text sanitization function to use before validation
function sanitizePlainText(input: string): string {
	let sanitized = input.trim()
	if (sanitized === '') return sanitized
	return sanitized.replace(/[&<>"'`=\/]/g, replaceChar)
}

// Simple number sanitization function to use before validation
function sanitizeNumber(input: number): number {
	return isNaN(input) ? 0 : input
}

// Simple email sanitization function to use before validation
function sanitizeEmail(input: string): string {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailRegex.test(input) ? input : ''
}

function sanitizeFilePath(input: string): string {
	const sanitized = path.normalize(input).replace(/^(\.\.(\/|\\|$))+/, '')
	return sanitized
}

function sanitizeURL(input: string): string {
	try {
		new URL(input)
		return input
	} catch (_) {
		return ''
	}
}

function sanitizeDate(input: string): string {
	return !isNaN(Date.parse(input)) ? input : ''
}

async function sanitize(
	name: string,
	value: string | number,
	inputTypeMap: {[key: string]: string},
) {
	// Retrieve input type from the mapping
	const inputType = inputTypeMap[name] || 'text' // Default to 'text' if not found

	// Sanitize input based on its type
	let sanitizedValue = ''
	if (inputType === 'password') {
		return value
	} else if (inputType === 'text') {
		sanitizedValue = sanitizePlainText(value as string)
	} else if (inputType === 'number') {
		return sanitizeNumber(Number(value))
	} else if (inputType === 'email') {
		return sanitizeEmail(value as string)
	} else if (inputType === 'url') {
		return sanitizeURL(value as string)
	} else if (inputType === 'date') {
		return sanitizeDate(value as string)
	} else if (inputType === 'file') {
		return sanitizeFilePath(value as string)
	}

	return sanitizedValue
}

export default sanitize
