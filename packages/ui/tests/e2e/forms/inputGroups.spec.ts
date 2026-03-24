import {expect, test} from '@playwright/test'
import {INPUTS} from '$tests/fixtures/form-inputs'

test('onclick event updates url search params', async ({page}) => {
	const key1 = 'sample_checkbox_group'
	const key2 = 'sample_checkbox_group_select_all'

	const checkboxGroup = INPUTS[key1]
	const checkboxGroupSelectAll = INPUTS[key2]

	await page.goto('/tests/forms')

	const input1 = checkboxGroup.items?.[0]

	expect(input1).toBeDefined()

	const locatorSelectAll = page.getByRole('checkbox', {
		name: checkboxGroupSelectAll.legend,
		exact: true,
	})

	const locatorInput1 = page.getByRole('checkbox', {
		name: `${input1?.label} Bis`,
		exact: true,
	})

	await locatorSelectAll.click()

	expect(locatorSelectAll).toBeChecked()

	let url = new URL(page.url())

	let params1 = url.searchParams.getAll(checkboxGroupSelectAll.name)
	let params2 = url.searchParams.getAll(checkboxGroup.name)

	const expected1 = checkboxGroupSelectAll.items?.map((i) => i.value)

	expect(params1).toEqual(expected1)
	expect(params2).toEqual([])

	await locatorInput1.click()
	await locatorSelectAll.click()

	expect(locatorSelectAll).not.toBeChecked()

	url = new URL(page.url())

	params1 = url.searchParams.getAll(checkboxGroupSelectAll.name)
	params2 = url.searchParams.getAll(checkboxGroup.name)

	expect(params1).toEqual([])
	expect(params2).toEqual([input1?.value])
})
