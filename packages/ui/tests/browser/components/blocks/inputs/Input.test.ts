import {describe, it, expect} from 'vitest'
import {page, userEvent} from 'vitest/browser'
import {render} from 'vitest-browser-svelte'

import InputTest from './InputTest.svelte'
import {getBasicInputFields} from '$tests/fixtures/form-inputs'

const testInputs = getBasicInputFields()

testInputs.forEach((toTest) => {
	describe(`Input ${toTest.type} - an typed input component`, () => {
		describe('state', () => {
			it(`should render component correctly`, async () => {
				const {getByRole} = render(InputTest)
				const locator = getByRole('textbox', {name: toTest.label})

				expect(locator).toBeInTheDocument()
			})

			it(`should render a disabled field correctly`, () => {
				const {getByRole} = render(InputTest)
				const locator = getByRole('textbox', {name: toTest.label})

				if (toTest.value.valid === 'disabled') {
					expect(locator).toBeDisabled()
				} else {
					expect(locator).toBeEnabled()
				}
			})
		})

		describe('accessibility', () => {
			it(`should have an accessible label`, async () => {
				const {getByLabelText} = render(InputTest)
				const locator = getByLabelText(toTest.label)

				expect(locator).toBeInTheDocument()
			})
		})

		describe.skip('behaviour - tested in utils/forms for now', () => {
			it.skip(`should handle inputs without errors`, async () => {
				const {getByRole} = render(InputTest)

				const locator = getByRole('textbox', {name: toTest.label})

				if (toTest.value.valid !== 'disabled') {
					await userEvent.fill(locator, toTest.value.valid)
					expect(locator).toBeValid()
				}
			})

			it.skip(`should handle inputs with errors`, async () => {
				const {getByRole} = render(InputTest)

				const locator = getByRole('textbox', {name: toTest.label})
				await userEvent.fill(locator, '')
				if (toTest.value.invalid) {
					expect(locator).not.toBeValid()
				}
			})
		})

		describe('style', () => {
			it(`should apply component styles correctly`, () => {
				page.render(InputTest)
			})
		})
	})
})
