/**
 *  Basic sanitization functions to use before validation
 */

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

// TODO: https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html#email-address-validation
function sanitizeEmail(input) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailRegex.test(input) ? input : ''
}

function sanitizeFilePath(input) {
	if (typeof input !== 'string') {
		return ''
	}
	const trimmed = input.trim()

	if (trimmed === '') {
		return trimmed
	}

	// Strip path traversal segments and directory components.
	// Note: OPFS and other browser file APIs sandbox the root,
	// but we sanitize defensively here
	return (
		trimmed
			.split(/[/\\]/)
			.filter(
				(segment) => segment !== '..' && segment !== '.' && segment !== '',
			)
			.map((segment) => sanitizePlainText(segment))
			.pop() ?? ''
	)
}

function sanitizeURL(input) {
	const sanitized = input.trim()
	if (sanitized === '') return sanitized
	try {
		const url = new URL(input)
		if (url.protocol !== 'http:' && url.protocol !== 'https:') {
			return null
		}
		return url.href
	} catch {
		return null
	}
}

function sanitizeDate(input) {
	return !isNaN(Date.parse(input)) ? input : null
}

function sanitizeForm(type, value) {
	// Sanitize input based on its type

	let sanitized

	switch (type) {
		case 'password':
		case 'checkbox':
		case 'radio':
			sanitized = value
			break

		case 'text':
		case 'textarea':
		case 'phone':
		case 'search':
			sanitized = sanitizePlainText(value)
			break

		case 'number':
		case 'range':
			sanitized = sanitizeNumber(Number(value))
			break

		case 'email': {
			const sanitizedEmail = sanitizePlainText(value)
			sanitized = sanitizeEmail(sanitizedEmail)
			break
		}

		case 'url':
			sanitized = sanitizeURL(value)
			break

		case 'date':
		case 'datetime-local':
			// case 'time': TODO
			sanitized = sanitizeDate(value)
			break

		case 'file':
			sanitized = sanitizeFilePath(value)
			break

		default:
			// For unknown types, sanitize as text
			console.warn(
				`Unknown input type "${type}", defaulting to text sanitization`,
			)
			sanitized = typeof value === 'string' ? sanitizePlainText(value) : ''
			break
	}

	return sanitized
}

export default {sanitizeForm, sanitizePlainText}
