import {describe, it, expect} from 'vitest'
import {userEvent} from 'vitest/browser'
import {render} from 'vitest-browser-svelte'

import InputGroupTest from './InputGroupTest.svelte'
import {INPUTS} from '$tests/fixtures/form-inputs'

describe(`InputGroup - a component group of radio or checkbox inputs`, () => {
	describe(`checkbox`, () => {
		const key = 'sample_checkbox_group'
		const input = INPUTS[key]

		describe('state', () => {
			it(`should render component correctly`, () => {
				const {getByText} = render(InputGroupTest, {
					props: {id: key},
				})

				if (input.legend) {
					const locator = getByText(input.legend)

					expect(locator).toBeInTheDocument()
				}
			})

			it(`should render a disabled field correctly`, () => {
				const {getByRole} = render(InputGroupTest, {
					props: {id: key},
				})

				const disabledInput = input.items?.find((i) => i.disabled)

				if (disabledInput) {
					const locator = getByRole('checkbox', {name: disabledInput.label})

					expect(locator).toBeDisabled()
				}
			})
		})

		describe('accessibility', () => {
			it(`should have an accessible label`, async () => {
				const {getByRole} = render(InputGroupTest, {
					props: {id: key},
				})
				// Input group legend tested in 'state' test

				const firstInput = input.items ? input.items[0] : undefined

				if (firstInput) {
					const locator = getByRole('checkbox', {name: firstInput.label})

					expect(locator).toBeInTheDocument()
				}
			})
		})

		describe('behaviour', () => {
			it(`should handle inputs without errors`, async ({expect}) => {
				const {getByRole} = render(InputGroupTest, {
					props: {id: key},
				})

				const firstInput = input.items ? input.items[0] : undefined

				if (firstInput) {
					const locator = getByRole('checkbox', {name: firstInput.label})

					await userEvent.click(locator)
					expect(locator).toBeValid()
				}
			})
		})

		describe('style', () => {
			it(`should apply valid component styles correctly`, async () => {
				const {getByRole, getByTestId} = render(InputGroupTest, {
					props: {id: key},
				})

				const firstInput = input.items ? input.items[1] : undefined

				if (firstInput) {
					const locator = getByRole('checkbox', {name: firstInput.label})

					// TODO: make @fat-fuzzy/validation schemas configurable from
					const labelLocator = getByTestId(`${input.name}.${firstInput.value}`)

					await userEvent.click(locator)
					await expect.element(labelLocator).toHaveClass('color:primary')
					await expect.element(labelLocator).not.toHaveClass('color:error')
				}
			})
		})
	})
})
