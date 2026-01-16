import {describe, test, expect} from 'vitest'
import format from '$lib/utils/format'

describe('format.ts - formatting utilities', () => {
	test('formats an href', () => {
		let href = format.formatHref('/posts', '')
		expect(href).toBe('/posts')

		href = format.formatHref('/posts', 'hello-world')
		expect(href).toBe('/posts/hello-world')
	})

	test('formats page classes', () => {
		let href = format.getClassNameFromPathname('/')
		expect(href).toBe('page:home')

		href = format.getClassNameFromPathname('/posts')
		expect(href).toBe('page:posts')
	})

	test('capitalizes strings', () => {
		const capitalized = format.capitalize('hello world')
		expect(capitalized).toBe('Hello world')
	})
})
