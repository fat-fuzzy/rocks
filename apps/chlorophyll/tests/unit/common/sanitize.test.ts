import {describe, test, expect} from 'vitest'
import {sanitizeFileName} from '$lib/common/sanitize'

const CONTAINS_PATH_TRAVERSAL = {
	root: '/',
	parent: '../',
	grandparent: '../../../',
}

const CONTAINS_FORBIDDEN_CHARS = [
	'@script',
	'<script',
	'script>',
	';script',
	'{script',
	'script;',
	'scr?ipt',
	'scr!ipt',
]

describe('sanitize.ts - basic sanitization for filename', () => {
	test('sanitizeFileName', () => {
		const sanitized = CONTAINS_FORBIDDEN_CHARS.map((filename) =>
			sanitizeFileName(filename),
		)

		sanitized.forEach((result) => {
			expect(result).toBe('script')
		})

		try {
			sanitizeFileName(CONTAINS_PATH_TRAVERSAL.root)
		} catch (error) {
			expect((error as Error).message).toBe('Invalid filename')
		}

		try {
			sanitizeFileName(CONTAINS_PATH_TRAVERSAL.parent)
		} catch (error) {
			expect((error as Error).message).toBe('Invalid filename')
		}

		try {
			sanitizeFileName(CONTAINS_PATH_TRAVERSAL.grandparent)
		} catch (error) {
			expect((error as Error).message).toBe('Invalid filename')
		}
	})
})
