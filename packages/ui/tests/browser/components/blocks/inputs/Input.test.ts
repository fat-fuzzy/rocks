import {describe, it, expect} from 'vitest'
import {userEvent} from 'vitest/browser'
import {render} from 'vitest-browser-svelte'

import InputTest from './InputTest.svelte'
import {INPUTS} from '$tests/fixtures/form-inputs'

const inputTypes = ['text', 'tel', 'email', 'password']

Object.keys(INPUTS).forEach((key) => {
	if (key === 'confirm_password') {
		return
	}

	const input = INPUTS[key]
	if (!inputTypes.includes(input.type)) {
		return
	}

	describe(`Input ${input.type} - an typed input component`, () => {
		describe('state', () => {
			it(`should render component correctly`, () => {
				const {getByRole} = render(InputTest, {
					props: {id: key},
				})
				const locator = getByRole('textbox', {name: input.label})

				expect(locator).toBeInTheDocument()
			})

			it(`should render a disabled field correctly`, () => {
				const {getByRole} = render(InputTest, {
					props: {id: key},
				})
				const locator = getByRole('textbox', {name: input.label})

				if (input.value.valid === 'disabled') {
					expect(locator).toBeDisabled()
				} else {
					expect(locator).toBeEnabled()
				}
			})
		})

		describe('accessibility', () => {
			it(`should have an accessible label`, async () => {
				const {getByLabelText} = render(InputTest, {
					props: {id: key},
				})
				const locator = getByLabelText(input.label)

				expect(locator).toBeInTheDocument()
			})
		})

		describe('behaviour', () => {
			it(`should handle inputs without errors`, async ({expect}) => {
				const {getByRole} = render(InputTest, {
					props: {id: key},
				})
				const locator = getByRole('textbox', {name: input.label})

				if (input.value.valid !== 'disabled') {
					await userEvent.fill(locator, input.value.valid)
					expect(locator).toBeValid()
				}
			})

			it(`should handle inputs with errors`, async () => {
				const {getByRole} = render(InputTest, {
					props: {id: key},
				})
				const locator = getByRole('textbox', {name: input.label})

				if (input.value.invalid) {
					await userEvent.fill(locator, input.value.invalid)
					expect(locator).not.toBeValid()
				}
			})
		})

		describe('style', () => {
			it(`should apply valid component styles correctly`, async () => {
				const {getByRole, getByText} = render(InputTest, {
					props: {id: key},
				})
				const inputLocator = getByRole('textbox', {name: input.label})
				const labelLocator = getByText(input.label, {exact: true})

				if (input.value.valid !== 'disabled') {
					await userEvent.fill(inputLocator, input.value.valid)
					await expect.element(labelLocator).toHaveClass('color:primary')
					await expect.element(labelLocator).not.toHaveClass('color:error')
				}
			})

			it(`should apply invalid component styles correctly`, async () => {
				const {getByRole, getByText} = render(InputTest, {
					props: {id: key},
				})
				const inputLocator = getByRole('textbox', {name: input.label})
				const labelLocator = getByText(input.label, {exact: true})

				if (input.value.invalid) {
					await userEvent.fill(inputLocator, input.value.invalid)
					await expect.element(labelLocator).toHaveClass('color:error')
				}
			})
		})
	})
})
