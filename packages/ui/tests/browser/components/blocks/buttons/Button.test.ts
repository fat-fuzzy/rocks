import {describe, it} from 'vitest'
import {page} from 'vitest/browser'
import ButtonTest from './ButtonTest.svelte'

describe(`Button - a basic button component`, () => {
	describe('state', () => {
		it(`should render component correctly`, () => {
			page.render(ButtonTest)
		})
	})

	describe('accessibility', () => {
		it(`should have an accessible label`, async () => {
			page.render(ButtonTest)
		})
	})

	describe('behaviour', () => {
		it(`should handle events without errors`, async () => {
			page.render(ButtonTest)
		})
	})

	describe('style', () => {
		it(`should apply component styles correctly`, () => {
			page.render(ButtonTest)
		})
	})
})
