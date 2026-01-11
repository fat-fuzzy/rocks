import {describe, it, expect, vi} from 'vitest'
import sanitize from '../src/utils/sanitize.js' // Adjust path as needed

const {sanitizeForm, sanitizePlainText} = sanitize

describe('sanitizePlainText', () => {
	it('should escape HTML special characters', () => {
		const input = '<script>alert("XSS")</script>'
		const expected = '&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#47;script&gt;'
		expect(sanitizePlainText(input)).toBe(expected)
	})

	it('should escape ampersands', () => {
		expect(sanitizePlainText('Tom & Jerry')).toBe('Tom &amp; Jerry')
	})

	it('should escape dangerous characters', () => {
		const input = `&<>"'\`=/`
		const expected = '&amp;&lt;&gt;&quot;&#39;&#96;&#61;&#47;'
		expect(sanitizePlainText(input)).toBe(expected)
	})

	it('should trim whitespace', () => {
		expect(sanitizePlainText('  hello world  ')).toBe('hello world')
	})

	it('should return empty string for whitespace-only input', () => {
		expect(sanitizePlainText('   ')).toBe('')
		expect(sanitizePlainText('\t\n')).toBe('')
	})

	it('should handle normal text without changes', () => {
		expect(sanitizePlainText('Hello World')).toBe('Hello World')
	})

	it('should return empty string for non-string input', () => {
		expect(sanitizePlainText(123)).toBe('')
		expect(sanitizePlainText(null)).toBe('')
		expect(sanitizePlainText(undefined)).toBe('')
		expect(sanitizePlainText({})).toBe('')
	})

	it('should handle empty strings', () => {
		expect(sanitizePlainText('')).toBe('')
	})

	it('should handle mixed content', () => {
		const input = '  Hello <b>World</b> & "Friends"  '
		const expected =
			'Hello &lt;b&gt;World&lt;&#47;b&gt; &amp; &quot;Friends&quot;'
		expect(sanitizePlainText(input)).toBe(expected)
	})
})

describe('sanitizeForm', () => {
	describe('text input types', () => {
		it('should sanitize text input', () => {
			const input = '<script>alert("xss")</script>'
			const result = sanitizeForm('text', input)
			expect(result).toBe(
				'&lt;script&gt;alert(&quot;xss&quot;)&lt;&#47;script&gt;',
			)
		})

		it('should sanitize textarea input', () => {
			const input = 'Line 1\n<div>Line 2</div>'
			const result = sanitizeForm('textarea', input)
			expect(result).toContain('&lt;div&gt;')
		})

		it('should sanitize search input', () => {
			const result = sanitizeForm('search', 'search<script>')
			expect(result).toContain('&lt;script&gt;')
		})

		it('should sanitize tel input', () => {
			const result = sanitizeForm('tel', '+1-555-<script>')
			expect(result).toContain('&lt;script&gt;')
		})
	})

	describe('password input type', () => {
		it('should NOT sanitize passwords', () => {
			const password = 'P@ss<word>"123'
			expect(sanitizeForm('password', password)).toBe(password)
		})

		it('should preserve all special characters in passwords', () => {
			const password = `<>"'&\`=/!@#$%^&*()`
			expect(sanitizeForm('password', password)).toBe(password)
		})
	})

	describe('number input types', () => {
		it('should return valid numbers', () => {
			expect(sanitizeForm('number', '42')).toBe(42)
			expect(sanitizeForm('number', 42)).toBe(42)
		})

		it('should return null for invalid numbers', () => {
			expect(sanitizeForm('number', 'not a number')).toBe(null)
			expect(sanitizeForm('number', 'abc123')).toBe(null)
		})

		it('should handle range input type', () => {
			expect(sanitizeForm('range', '50')).toBe(50)
		})

		it('should handle decimal numbers', () => {
			expect(sanitizeForm('number', '3.14')).toBe(3.14)
		})

		it('should handle negative numbers', () => {
			expect(sanitizeForm('number', '-42')).toBe(-42)
		})
	})

	describe('email input type', () => {
		it('should return valid email addresses', () => {
			const validEmails = [
				'user@example.com',
				'test.user@example.com',
				'user+tag@example.co.uk',
			]

			validEmails.forEach((email) => {
				expect(sanitizeForm('email', email)).toBe(email)
			})
		})

		it('should return empty string for invalid emails', () => {
			const invalidEmails = [
				'not-an-email',
				'@example.com',
				'user@',
				'user @example.com',
				'user@example',
			]

			invalidEmails.forEach((email) => {
				expect(sanitizeForm('email', email)).toBe('')
			})
		})

		it('should sanitize XSS attempts in email field', () => {
			// Invalid emails should be sanitized first
			const result = sanitizeForm(
				'email',
				'user<script>alert(1)</script>@example.com',
			)
			expect(result).toBe(
				'user&lt;script&gt;alert(1)&lt;&#47;script&gt;@example.com',
			)
		})
	})

	describe('url input type', () => {
		it('should return valid URLs', () => {
			const validUrls = [
				'https://example.com/',
				'http://example.com/path',
				'https://example.com:8080/path?query=value',
			]

			validUrls.forEach((url) => {
				expect(sanitizeForm('url', url)).toBe(url)
			})
		})

		it('should return empty string for invalid URLs', () => {
			const invalidUrls = [
				'not a url',
				'example.com', // Missing protocol
				'javascript:alert(1)',
				'file:///etc/passwd',
			]

			invalidUrls.forEach((url) => {
				const result = sanitizeForm('url', url)
				expect(result).toBe(null)
			})
		})
	})

	describe('date input types', () => {
		it('should validate date input', () => {
			const result = sanitizeForm('date', '2024-01-15')
			expect(result).toBe('2024-01-15')
		})

		it('should validate datetime-local input', () => {
			const result = sanitizeForm('datetime-local', '2024-01-15T10:30')
			expect(result).toBe('2024-01-15T10:30')
		})

		it('should validate time input', () => {
			const result = sanitizeForm('time', '10:30')
			expect(result).toBe('10:30')
		})

		it('should reject invalid dates', () => {
			const result = sanitizeForm('date', 'not a date')
			expect(result).toBe(null)
		})
	})

	describe('file input type', () => {
		it('should normalize file paths', () => {
			const result = sanitizeForm('file', 'path/to/file.txt')
			expect(result).toBeDefined()
		})

		it('should prevent path traversal attacks', () => {
			const maliciousPath = '../../../etc/passwd'
			const result = sanitizeForm('file', maliciousPath)
			expect(result).not.toContain('..')
		})

		it('should handle Windows paths', () => {
			const windowsPath = 'C:\\Users\\test\\file.txt'
			const result = sanitizeForm('file', windowsPath)
			expect(result).toBeDefined()
		})
	})

	describe('checkbox and radio input types', () => {
		it('should return checkbox values as-is', () => {
			expect(sanitizeForm('checkbox', 'on')).toBe('on')
			expect(sanitizeForm('checkbox', 'true')).toBe('true')
		})

		it('should return radio values as-is', () => {
			expect(sanitizeForm('radio', 'option1')).toBe('option1')
		})
	})

	describe('unknown input types', () => {
		it('should default to text sanitization for unknown types', () => {
			// Suppress console.warn for this test
			const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

			const result = sanitizeForm('unknown-type', '<script>xss</script>')
			expect(result).toContain('&lt;script&gt;')

			warnSpy.mockRestore()
		})

		it('should warn about unknown input types', () => {
			const warnSpy = vi.spyOn(console, 'warn')

			sanitizeForm('custom-type', 'value')

			expect(warnSpy).toHaveBeenCalledWith(
				expect.stringContaining('Unknown input type'),
			)

			warnSpy.mockRestore()
		})
	})

	describe('edge cases', () => {
		it('should handle null values', () => {
			expect(sanitizeForm('text', null)).toBe('')
		})

		it('should handle undefined values', () => {
			expect(sanitizeForm('text', undefined)).toBe('')
		})

		it('should handle very long strings', () => {
			const longString = 'a'.repeat(10000) + '<script>xss</script>'
			const result = sanitizeForm('text', longString)
			expect(result).toContain('&lt;script&gt;')
		})

		it('should handle unicode characters', () => {
			const unicode = 'Hello 世界 🌍'
			const result = sanitizeForm('text', unicode)
			expect(result).toBe(unicode) // Unicode should be preserved
		})

		it('should handle emoji', () => {
			const emoji = '😀 👍 ❤️'
			expect(sanitizeForm('text', emoji)).toBe(emoji)
		})
	})

	describe('additional security tests', () => {
		it('should prevent script injection', () => {
			const attacks = [
				'<script>alert("xss")</script>',
				'<img src=x onerror=alert(1)>',
				'<iframe src="javascript:alert(1)">',
				'<svg onload=alert(1)>',
				'<body onload=alert(1)>',
			]

			attacks.forEach((attack) => {
				const result = sanitizeForm('text', attack)
				expect(result).not.toContain('<script')
				expect(result).not.toContain('<img')
				expect(result).not.toContain('<iframe')
				expect(result).not.toContain('onerror=')
				expect(result).not.toContain('onload=')
			})
		})

		it('should prevent SQL injection characters in text', () => {
			const sqlInjection = `'; DROP TABLE users; --`
			const result = sanitizeForm('text', sqlInjection)
			expect(result).toContain('&#39;') // Single quote escaped
		})
	})
})

describe('Integration: Form workflow', () => {
	it('should sanitize a complete form submission', () => {
		const formData = {
			name: '  Fat <script>Fuzzy</script>  ',
			email: 'fuzzy@example.com',
			age: '25',
			password: 'P@ss<word>123',
			website: 'https://example.com',
			bio: 'I can turn my head round & round!',
		}

		const inputTypes = {
			name: 'text',
			email: 'email',
			age: 'number',
			password: 'password',
			website: 'url',
			bio: 'textarea',
		}

		const sanitized = {}
		Object.entries(formData).forEach(([field, value]) => {
			sanitized[field] = sanitizeForm(inputTypes[field], value)
		})

		expect(sanitized.name).toBe('Fat &lt;script&gt;Fuzzy&lt;&#47;script&gt;')
		expect(sanitized.email).toBe('fuzzy@example.com')
		expect(sanitized.age).toBe(25)
		expect(sanitized.password).toBe('P@ss<word>123') // Unchanged
		expect(sanitized.website).toBe('https://example.com/')
		expect(sanitized.bio).toContain('&amp;')
	})
})
