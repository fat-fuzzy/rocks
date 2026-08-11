import {describe, it} from 'vitest'
import {page} from 'vitest/browser'
import TagsTest from './TagsTest.svelte'

describe(`Tags - a component to apply and manage tags`, () => {
	describe('state', () => {
		it(`should render component correctly`, () => {
			page.render(TagsTest)
		})
	})

	describe('accessibility', () => {
		it(`should have an accessible label`, async () => {
			page.render(TagsTest)
		})
	})

	describe('behaviour', () => {
		it(`should handle events without errors`, async () => {
			page.render(TagsTest)
		})
	})

	describe('style', () => {
		it(`should apply component styles correctly`, () => {
			page.render(TagsTest)
		})
	})
})
