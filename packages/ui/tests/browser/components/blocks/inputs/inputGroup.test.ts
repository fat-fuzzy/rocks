import {describe, it, test, expect} from 'vitest'
import {userEvent} from 'vitest/browser'
import {render} from 'vitest-browser-svelte'

import InputGroupTest from './InputGroupTest.svelte'
import {INPUTS} from '$tests/fixtures/form-inputs'

describe(`InputGroup - a component group of radio or checkbox inputs`, () => {
	describe('checkbox', () => {
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

				const input1 = input.items ? input.items[0] : undefined

				if (input1) {
					const locator = getByRole('checkbox', {name: input1.label})

					expect(locator).toBeInTheDocument()
				}
			})
		})

		describe('behaviour', () => {
			it(`should handle events without errors`, async ({expect}) => {
				const {getByRole} = render(InputGroupTest, {
					props: {id: key},
				})

				const input1 = input.items ? input.items[0] : undefined

				if (input1) {
					const locator = getByRole('checkbox', {name: input1.label})

					await userEvent.click(locator)
					expect(locator).toBeValid()
				}
			})

			it(`should check a single input on each click - multiple checks allowed`, async ({
				expect,
			}) => {
				const {getByRole} = render(InputGroupTest, {
					props: {id: key},
				})

				const input1 = input.items ? input.items[0] : undefined
				const input2 = input.items ? input.items[1] : undefined

				if (input1 && input2) {
					const locator1 = getByRole('checkbox', {name: input1.label})
					const locator2 = getByRole('checkbox', {name: input2.label})

					await userEvent.click(locator1)

					expect(locator1).toBeChecked()
					expect(locator2).not.toBeChecked()

					await userEvent.click(locator2)

					expect(locator1).toBeChecked()
					expect(locator2).toBeChecked()
				}
			})

			it(`should uncheck a single input on each click - multiple checks allowed`, async ({
				expect,
			}) => {
				const {getByRole} = render(InputGroupTest, {
					props: {id: key},
				})

				const input1 = input.items ? input.items[0] : undefined
				const input2 = input.items ? input.items[1] : undefined

				if (input1 && input2) {
					const locator1 = getByRole('checkbox', {name: input1.label})
					const locator2 = getByRole('checkbox', {name: input2.label})

					await userEvent.click(locator1)

					expect(locator1).toBeChecked()
					expect(locator2).not.toBeChecked()

					await userEvent.click(locator2)

					expect(locator1).toBeChecked()
					expect(locator2).toBeChecked()

					await userEvent.click(locator1)

					expect(locator1).not.toBeChecked()
					expect(locator2).toBeChecked()

					await userEvent.click(locator2)

					expect(locator1).not.toBeChecked()
					expect(locator2).not.toBeChecked()
				}
			})
		})

		describe('style', () => {
			it(`should apply valid component styles correctly`, async () => {
				const {getByTestId} = render(InputGroupTest, {
					props: {id: key},
				})

				const input1 = input.items ? input.items[1] : undefined

				if (input1) {
					const labelLocator = getByTestId(`${input.name}.${input1.value}`)

					await expect.element(labelLocator).toHaveClass('color:primary')
					await expect.element(labelLocator).not.toHaveClass('color:error')
				}
			})
		})
	})

	describe(`checkbox select-all`, () => {
		const key = 'sample_checkbox_group_select_all'
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

				expect(disabledInput).toBeDefined()
				const locator = getByRole('checkbox', {name: disabledInput?.label})

				expect(locator).toBeDisabled()
			})
		})

		describe('accessibility', () => {
			it(`should have an accessible label`, async () => {
				const {getByRole} = render(InputGroupTest, {
					props: {id: key},
				})
				// Input group legend tested in 'state' test

				const input1 = input.items ? input.items[0] : undefined

				expect(input1).toBeDefined()

				const locator = getByRole('checkbox', {name: input1?.label})

				expect(locator).toBeInTheDocument()
			})
		})

		describe('behaviour', () => {
			it(`should handle events without errors`, async ({expect}) => {
				const {getByRole} = render(InputGroupTest, {
					props: {id: key},
				})

				const input1 = input.items ? input.items[0] : undefined

				expect(input1).toBeDefined()

				const locator = getByRole('checkbox', {name: input1?.label})

				await userEvent.click(locator)
				expect(locator).toBeValid()
			})

			test(`a group item should check a single input at a time`, async ({
				expect,
			}) => {
				const {getByRole} = render(InputGroupTest, {
					props: {id: key},
				})

				const input1 = input.items ? input.items[0] : undefined
				const input2 = input.items ? input.items[1] : undefined

				expect(input1).toBeDefined()
				expect(input2).toBeDefined()

				const locator1 = getByRole('checkbox', {name: input1?.label})
				const locator2 = getByRole('checkbox', {name: input2?.label})

				await userEvent.click(locator1)
				expect(locator1).toBeChecked()
				expect(locator2).not.toBeChecked()
			})

			test(`a group item should uncheck a single input at a time`, async ({
				expect,
			}) => {
				const {getByRole} = render(InputGroupTest, {
					props: {id: key},
				})

				const input1 = input.items ? input.items[0] : undefined
				const input2 = input.items ? input.items[1] : undefined

				expect(input1).toBeDefined()
				expect(input2).toBeDefined()

				const locator1 = getByRole('checkbox', {name: input1?.label})
				const locator2 = getByRole('checkbox', {name: input2?.label})

				await userEvent.click(locator1)

				expect(locator1).toBeChecked()
				expect(locator2).not.toBeChecked()

				await userEvent.click(locator2)

				expect(locator1).toBeChecked()
				expect(locator2).toBeChecked()

				await userEvent.click(locator1)

				expect(locator1).not.toBeChecked()
				expect(locator2).toBeChecked()

				await userEvent.click(locator2)

				expect(locator1).not.toBeChecked()
				expect(locator2).not.toBeChecked()
			})

			test(`select-all item should check all inputs`, async ({expect}) => {
				const {getByRole} = render(InputGroupTest, {
					props: {id: key, skipDisabled: true},
				})

				const input1 = input.items ? input.items[0] : undefined
				const input2 = input.items ? input.items[1] : undefined
				const input3 = input.items ? input.items[2] : undefined
				const input4 = input.items ? input.items[3] : undefined
				const input5 = input.items ? input.items[4] : undefined
				const input6 = input.items ? input.items[5] : undefined

				expect(input1).toBeDefined()
				expect(input2).toBeDefined()
				expect(input3).toBeDefined()
				expect(input4).toBeDefined()
				expect(input5).toBeDefined()
				expect(input6).toBeDefined()

				const locatorSelectAll = getByRole('checkbox', {name: input.legend})
				const locator1 = getByRole('checkbox', {name: input1?.label})
				const locator2 = getByRole('checkbox', {name: input2?.label})
				const locator3 = getByRole('checkbox', {name: input3?.label})
				const locator4 = getByRole('checkbox', {name: input4?.label})
				const locator5 = getByRole('checkbox', {name: input5?.label})
				const locator6 = getByRole('checkbox', {name: input6?.label})

				await userEvent.click(locatorSelectAll)

				expect(locator1).toBeChecked()
				expect(locator2).toBeChecked()
				expect(locator3).toBeChecked()
				expect(locator4).toBeChecked()
				expect(locator5).toBeChecked()
				expect(locator6).toBeChecked()
				expect(locatorSelectAll).toBeChecked()
			})

			test(`select-all item should uncheck all inputs`, async ({expect}) => {
				const {getByRole} = render(InputGroupTest, {
					props: {id: key, skipDisabled: true},
				})

				const input1 = input.items ? input.items[0] : undefined
				const input2 = input.items ? input.items[1] : undefined
				const input3 = input.items ? input.items[2] : undefined
				const input4 = input.items ? input.items[3] : undefined
				const input5 = input.items ? input.items[4] : undefined
				const input6 = input.items ? input.items[5] : undefined

				expect(input1).toBeDefined()
				expect(input2).toBeDefined()
				expect(input3).toBeDefined()
				expect(input4).toBeDefined()
				expect(input5).toBeDefined()
				expect(input6).toBeDefined()

				const locatorSelectAll = getByRole('checkbox', {name: input.legend})
				const locator1 = getByRole('checkbox', {name: input1?.label})
				const locator2 = getByRole('checkbox', {name: input2?.label})
				const locator3 = getByRole('checkbox', {name: input3?.label})
				const locator4 = getByRole('checkbox', {name: input4?.label})
				const locator5 = getByRole('checkbox', {name: input5?.label})
				const locator6 = getByRole('checkbox', {name: input6?.label})

				await userEvent.click(locatorSelectAll)

				expect(locator1).toBeChecked()
				expect(locator2).toBeChecked()
				expect(locator3).toBeChecked()
				expect(locator4).toBeChecked()
				expect(locator5).toBeChecked()
				expect(locator6).toBeChecked()
				expect(locatorSelectAll).toBeChecked()

				await userEvent.click(locatorSelectAll)

				expect(locator1).not.toBeChecked()
				expect(locator2).not.toBeChecked()
				expect(locator3).not.toBeChecked()
				expect(locator4).not.toBeChecked()
				expect(locator5).not.toBeChecked()
				expect(locator6).not.toBeChecked()
				expect(locatorSelectAll).not.toBeChecked()
			})

			test(`should show indeterminate select-all when inputs are partially selected`, async ({
				expect,
			}) => {
				const {getByRole} = render(InputGroupTest, {
					props: {id: key},
				})

				const input1 = input.items ? input.items[0] : undefined
				const input2 = input.items ? input.items[1] : undefined
				const input4 = input.items ? input.items[3] : undefined
				const input5 = input.items ? input.items[4] : undefined
				const input6 = input.items ? input.items[5] : undefined

				expect(input1).toBeDefined()
				expect(input2).toBeDefined()
				expect(input4).toBeDefined()
				expect(input5).toBeDefined()
				expect(input6).toBeDefined()

				const locatorSelectAll = getByRole('checkbox', {name: input.legend})
				const locator1 = getByRole('checkbox', {name: input1?.label})

				await userEvent.click(locatorSelectAll)

				expect(locatorSelectAll).toBeChecked()

				await userEvent.click(locator1)

				expect(locatorSelectAll).toBePartiallyChecked()
			})

			test(`checking all items individually should check select-all input`, async ({
				expect,
			}) => {
				const {getByRole} = render(InputGroupTest, {
					props: {id: key, skipDisabled: true},
				})

				const input1 = input.items ? input.items[0] : undefined
				const input2 = input.items ? input.items[1] : undefined
				const input3 = input.items ? input.items[2] : undefined
				const input4 = input.items ? input.items[3] : undefined
				const input5 = input.items ? input.items[4] : undefined
				const input6 = input.items ? input.items[5] : undefined

				expect(input1).toBeDefined()
				expect(input2).toBeDefined()
				expect(input3).toBeDefined()
				expect(input4).toBeDefined()
				expect(input5).toBeDefined()
				expect(input6).toBeDefined()

				const locatorSelectAll = getByRole('checkbox', {name: input.legend})
				const locator1 = getByRole('checkbox', {name: input1?.label})
				const locator2 = getByRole('checkbox', {name: input2?.label})
				const locator3 = getByRole('checkbox', {name: input3?.label})
				const locator4 = getByRole('checkbox', {name: input4?.label})
				const locator5 = getByRole('checkbox', {name: input5?.label})
				const locator6 = getByRole('checkbox', {name: input6?.label})

				await userEvent.click(locator1)
				await userEvent.click(locator2)
				await userEvent.click(locator3)
				await userEvent.click(locator4)
				await userEvent.click(locator5)
				await userEvent.click(locator6)

				expect(locatorSelectAll).toBeChecked()
			})

			test(`unchecking all items individually should uncheck select-all input`, async ({
				expect,
			}) => {
				const {getByRole} = render(InputGroupTest, {
					props: {id: key, skipDisabled: true},
				})

				const input1 = input.items ? input.items[0] : undefined
				const input2 = input.items ? input.items[1] : undefined
				const input3 = input.items ? input.items[2] : undefined
				const input4 = input.items ? input.items[3] : undefined
				const input5 = input.items ? input.items[4] : undefined
				const input6 = input.items ? input.items[5] : undefined

				expect(input1).toBeDefined()
				expect(input2).toBeDefined()
				expect(input3).toBeDefined()
				expect(input4).toBeDefined()
				expect(input5).toBeDefined()
				expect(input6).toBeDefined()

				const locatorSelectAll = getByRole('checkbox', {name: input.legend})
				const locator1 = getByRole('checkbox', {name: input1?.label})
				const locator2 = getByRole('checkbox', {name: input2?.label})
				const locator3 = getByRole('checkbox', {name: input3?.label})
				const locator4 = getByRole('checkbox', {name: input4?.label})
				const locator5 = getByRole('checkbox', {name: input5?.label})
				const locator6 = getByRole('checkbox', {name: input6?.label})

				await userEvent.click(locatorSelectAll)
				expect(locatorSelectAll).toBeChecked()

				await userEvent.click(locator1)
				await userEvent.click(locator2)
				await userEvent.click(locator3)
				await userEvent.click(locator4)
				await userEvent.click(locator5)
				await userEvent.click(locator6)

				expect(locatorSelectAll).not.toBeChecked()
			})
		})

		describe('style', () => {
			it(`should apply valid component styles correctly`, async () => {
				const {getByTestId} = render(InputGroupTest, {
					props: {id: key},
				})

				const input1 = input.items ? input.items[1] : undefined

				if (input1) {
					const labelLocator = getByTestId(`${input.name}.${input1.value}`)

					await expect.element(labelLocator).toHaveClass('color:primary')
					await expect.element(labelLocator).not.toHaveClass('color:error')
				}
			})
		})
	})

	describe('radio', () => {
		const key = 'sample_radio_group'
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
					const locator = getByRole('radio', {name: disabledInput.label})

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

				const input1 = input.items ? input.items[0] : undefined

				if (input1) {
					const locator = getByRole('radio', {name: input1.label})

					expect(locator).toBeInTheDocument()
				}
			})
		})

		describe('behaviour', () => {
			it(`should handle events without errors`, async ({expect}) => {
				const {getByRole} = render(InputGroupTest, {
					props: {id: key},
				})

				const input1 = input.items ? input.items[0] : undefined

				if (input1) {
					const locator = getByRole('radio', {name: input1.label})

					await userEvent.click(locator)
					expect(locator).toBeValid()
				}
			})

			it(`should check a single input on each click - multiple checks not allowed`, async ({
				expect,
			}) => {
				const {getByRole} = render(InputGroupTest, {
					props: {id: key},
				})

				const input1 = input.items ? input.items[0] : undefined
				const input2 = input.items ? input.items[1] : undefined

				if (input1 && input2) {
					const locator1 = getByRole('radio', {name: input1.label})
					const locator2 = getByRole('radio', {name: input2.label})

					await userEvent.click(locator1)

					expect(locator1).toBeChecked()
					expect(locator2).not.toBeChecked()

					await userEvent.click(locator2)

					expect(locator1).not.toBeChecked()
					expect(locator2).toBeChecked()
				}
			})

			it(`should uncheck a single input on each click - multiple checks not allowed`, async ({
				expect,
			}) => {
				const {getByRole} = render(InputGroupTest, {
					props: {id: key},
				})

				const input1 = input.items ? input.items[0] : undefined
				const input2 = input.items ? input.items[1] : undefined

				if (input1 && input2) {
					const locator1 = getByRole('radio', {name: input1.label})
					const locator2 = getByRole('radio', {name: input2.label})

					await userEvent.click(locator1)

					expect(locator1).toBeChecked()
					expect(locator2).not.toBeChecked()

					await userEvent.click(locator2)

					expect(locator1).not.toBeChecked()
					expect(locator2).toBeChecked()

					await userEvent.click(locator1)

					expect(locator1).toBeChecked()
					expect(locator2).not.toBeChecked()
				}
			})
		})

		describe('style', () => {
			it(`should apply valid component styles correctly`, async () => {
				const {getByTestId} = render(InputGroupTest, {
					props: {id: key},
				})

				const input1 = input.items ? input.items[1] : undefined

				if (input1) {
					const labelLocator = getByTestId(`${input.name}.${input1.value}`)

					await expect.element(labelLocator).toHaveClass('color:primary')
					await expect.element(labelLocator).not.toHaveClass('color:error')
				}
			})
		})
	})
})
