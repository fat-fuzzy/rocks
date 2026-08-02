export function sanitizeFileName(_filename: string): string {
	// 1. Reject explicitly
	if (_filename.includes('..') || _filename.includes('/')) {
		throw Error('Invalid filename')
	}

	// 2. Strip anything unexpected as a second layer
	return _filename.replace(/[^a-zA-Z0-9_\-.]/g, '')
}
