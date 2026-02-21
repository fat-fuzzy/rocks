import {describe, test, expect} from 'vitest'
import {userEvent, type Locator} from 'vitest/browser'
import {render} from 'vitest-browser-svelte'
import {INPUTS} from '$tests/fixtures/form-inputs'
import Form from './FormTest.svelte'

describe('FormValidator - Svelte Integration Tests', () => {
	describe('validateInput', async () => {
		test('should  display errors for invalid inputs', async () => {
			const {getByText, getByRole, getByLabelText} = render(Form)

			const inputs: {locator: Locator; key: string}[] = []

			Object.keys(INPUTS).forEach((key) => {
				inputs.push({locator: getByLabelText(INPUTS[key].label), key})
			})

			for (const input of inputs) {
				const loc = input.locator

				expect(loc).toBeDefined()

				if (
					INPUTS[input.key].type === 'checkbox' ||
					INPUTS[input.key].type === 'radio'
				) {
					// Leave unchecked to trigger validation error
				} else {
					if (input.key === 'sample_disabled_field') {
						expect(loc).toBeDisabled()
					} else if (input.key === 'confirm_password') {
						expect(loc).toBeDisabled()

						const dependsOn = INPUTS[input.key].dependsOn
						if (dependsOn) {
							const previousInput = getByLabelText(INPUTS[dependsOn].label)
							const value = INPUTS[dependsOn].value.valid
							if (value) await previousInput.fill(value)
						}

						expect(loc).toBeEnabled()

						const value = INPUTS[input.key].value.invalid

						if (value) await loc.fill(value)

						INPUTS[input.key].errors.forEach((message) => {
							const error = getByText(message)
							expect(error).toBeInTheDocument()
						})
					} else {
						const value = INPUTS[input.key].value.invalid
						if (value) await loc.fill(value)
						INPUTS[input.key].errors.forEach((message) => {
							const error = getByText(message)
							expect(error).toBeInTheDocument()
						})
					}
				}
			}

			const submitButton = getByRole('button', {name: 'Submit'})
			expect(submitButton).toBeDisabled()
		})

		test('should submit form with valid inputs', async () => {
			const {getByRole, getByLabelText} = render(Form)

			const inputs: {locator: Locator; key: string}[] = []

			Object.keys(INPUTS).forEach((key) => {
				inputs.push({locator: getByLabelText(INPUTS[key].label), key})
			})

			for (const input of inputs) {
				if (
					INPUTS[input.key].type === 'checkbox' ||
					INPUTS[input.key].type === 'radio'
				) {
					await input.locator.click()
				} else {
					if (input.key === 'sample_disabled_field') {
						expect(input.locator).toBeDisabled()
					} else {
						await input.locator.fill(INPUTS[input.key].value.valid)
					}
				}
			}

			const submitButton = getByRole('button', {name: 'Submit'})
			await userEvent.click(submitButton)
		})
	})

	test('destroy', async () => {
		const {getByText, unmount} = render(Form)

		await Promise.all(
			Object.keys(INPUTS).map(async (key) => {
				await expect.element(getByText(INPUTS[key].label)).toBeInTheDocument()
			}),
		)

		let input = getByText(INPUTS['sample_name'].label)
		expect(input).toBeInTheDocument()

		// Unmount the component to trigger destroy
		unmount()

		input = getByText(INPUTS['sample_name'].label)
		expect(input).not.toBeInTheDocument()
	})
})
