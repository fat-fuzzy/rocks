import DOMPurify from 'dompurify'

function sanitizeHtml(input) {
	return DOMPurify.sanitize(input)
}
