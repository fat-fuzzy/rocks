import {describe, it, expect} from 'vitest'
import {userEvent} from 'vitest/browser'
import {render} from 'vitest-browser-svelte'

import InputCheckTest from './InputCheckTest.svelte'
import {INPUTS} from '$tests/fixtures/form-inputs'

const key = 'checkbox'
const input = INPUTS[key]

describe(`InputCheck - a checkbox input component`, () => {
	describe('state', () => {
		it(`should render component correctly`, () => {
			const {getByRole} = render(InputCheckTest, {
				props: {id: key},
			})
			const locator = getByRole('checkbox', {name: input.label})

			expect(locator).toBeInTheDocument()
		})

		it(`should render a disabled field correctly`, () => {
			const {getByRole} = render(InputCheckTest, {
				props: {id: key},
			})
			const locator = getByRole('checkbox', {name: input.label})

			if (input.value.valid === 'disabled') {
				expect(locator).toBeDisabled()
			} else {
				expect(locator).toBeEnabled()
			}
		})
	})

	describe('accessibility', () => {
		it(`should have an accessible label`, async () => {
			const {getByLabelText} = render(InputCheckTest, {
				props: {id: key},
			})
			const locator = getByLabelText(input.label)

			expect(locator).toBeInTheDocument()
		})
	})

	describe('behaviour', () => {
		it(`should handle inputs without errors`, async ({expect}) => {
			const {getByRole} = render(InputCheckTest, {
				props: {id: key},
			})
			const locator = getByRole('checkbox', {name: input.label})

			if (input.value.valid !== 'disabled') {
				await userEvent.click(locator)
				expect(locator).toBeValid()
			}
		})
	})

	describe('style', () => {
		it(`should apply valid component styles correctly`, async () => {
			const {getByRole, getByTestId} = render(InputCheckTest, {
				props: {id: key},
			})
			const inputLocator = getByRole('checkbox', {name: input.label})
			const labelLocator = getByTestId(`${input.name}.${input.value.valid}`)

			if (input.value.valid !== 'disabled') {
				await userEvent.click(inputLocator)
				await expect.element(labelLocator).toHaveClass('color:primary')
				await expect.element(labelLocator).not.toHaveClass('color:error')
			}
		})
	})
})
