import {test, expect} from '@playwright/experimental-ct-svelte'
import format from '../../../dist/utils/format'
import mocks from '../../../dist/api/fixtures/js/buttons'

import Button from '../../../dist/components/blocks/buttons/Button.svelte'
import ButtonMenu from '../../../dist/components/blocks/buttons/ButtonMenu.svelte'
import Toggle from '../../../dist/components/blocks/buttons/Toggle.svelte'
import ToggleMenu from '../../../dist/components/blocks/buttons/ToggleMenu.svelte'

const {button, buttonMenu, toggle, toggleMenu} = mocks
test.use({viewport: {width: 500, height: 500}})

test('Button', async ({mount}) => {
	// 1. Init
	let clicked = false
	const component = await mount(Button, {
		props: {
			onClick: () => {
				clicked = true
			},
		},
	})
	// 2. Test display
	const label = format.formatLabel(button.text, button.asset)
	await expect(component).toHaveText(label)

	// 3. Test behaviour
	await component.click()
	expect(clicked).toBeTruthy()
})

test('ButtonMenu', async ({mount}) => {
	// 1. Init
	let clicked = false
	const component = await mount(ButtonMenu)
	// 2. Test display
	const labels = buttonMenu.map((button) => format.formatLabel(button.text, button.asset))
	await expect(component).toHaveText(labels.join(' '))

	// 3. Test behaviour
	await component.getByText(labels[0]).click()
	// expect(clicked).toBeTruthy() // TODO: fix
})

test('Toggle', async ({mount}) => {
	// 1. Init
	const component = await mount(Toggle)

	// 2. Test display
	const label = format.formatLabel(toggle.text, toggle.asset)
	await expect(component).toHaveText(label)

	// 3. Test behaviour
	// TODO
})

test('ToggleMenu', async ({mount}) => {
	const component = await mount(ToggleMenu)

	// 2. Test display
	const labels = toggleMenu.map((button) => format.formatLabel(button.text, button.asset))
	await expect(component).toHaveText(labels.join(' '))

	// 3. Test behaviour
	// TODO
})
