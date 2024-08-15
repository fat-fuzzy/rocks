/**
 *  Simple sanitization functions to use before validation
 *
 */
import path from 'path'

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

// Simple plain text sanitization function to use before validation
function sanitizePlainText(input) {
	let sanitized = input.trim()
	if (sanitized === '') return sanitized
	return sanitized.replace(/[&<>"'`=\/]/g, replaceChar)
}

// Simple number sanitization function to use before validation
function sanitizeNumber(input) {
	return isNaN(input) ? 0 : input
}

// Simple email sanitization function to use before validation
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
	} catch (_) {
		return ''
	}
}

function sanitizeDate(input) {
	return !isNaN(Date.parse(input))
}

async function sanitize(name, value, inputTypeMap) {
	// Retrieve input type from the mapping
	const inputType = inputTypeMap[name] || 'text' // Default to 'text' if not found

	// Sanitize input based on its type
	let sanitizedValue = ''
	if (inputType === 'password') {
		return value
	} else if (inputType === 'text') {
		return sanitizePlainText(value)
	} else if (inputType === 'number') {
		return sanitizeNumber(Number(value))
	} else if (inputType === 'email') {
		return sanitizeEmail(value) ? value : ''
	} else if (inputType === 'url') {
		return sanitizeURL(value) ? value : ''
	} else if (inputType === 'date') {
		return sanitizeDate(value) ? value : ''
	} else if (inputType === 'file') {
		return sanitizeFilePath(value) ? value : ''
	}

	return sanitizedValue
}

export default sanitize
