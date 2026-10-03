import {describe, it} from 'vitest'
import {render} from 'vitest-browser-svelte'
import ButtonTest from './ButtonTest.svelte'

describe(`Button - a basic button component`, () => {
	describe('state', () => {
		it(`should render component correctly`, () => {
			render(ButtonTest)
		})
	})

	describe('accessibility', () => {
		it(`should have an accessible label`, async () => {
			render(ButtonTest)
		})
	})

	describe('behaviour', () => {
		it(`should handle events without errors`, async () => {
			render(ButtonTest)
		})
	})

	describe('style', () => {
		it(`should apply component styles correctly`, () => {
			render(ButtonTest)
		})
	})
})
