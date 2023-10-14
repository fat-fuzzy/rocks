import {test, expect} from '@playwright/experimental-ct-svelte'
import mocks from '../../../dist/data/mocks'
import format from '../../../dist/utils/format'

import Button from '../../../dist/components/blocks/buttons/Button.svelte'
import ButtonMenu from '../../../dist/components/blocks/buttons/ButtonMenu.svelte'
import Toggle from '../../../dist/components/blocks/buttons/Toggle.svelte'
import ToggleMenu from '../../../dist/components/blocks/buttons/ToggleMenu.svelte'

const {button, menu, toggle, toggleMenu} = mocks

test.use({viewport: {width: 500, height: 500}})

test('Button', async ({mount, page}) => {
	const component = await mount(Button)
	const label = format.formatLabel(button.text, button.asset)

	await expect(component).toHaveText(label)
})

test('ButtonMenu', async ({mount}) => {
	const component = await mount(ButtonMenu)
	const labels = menu.map((button) => format.formatLabel(button.text, button.asset)).join(' ')

	await expect(component).toHaveText(labels)
	component.getByRole('button')
})

test('Toggle', async ({mount}) => {
	const component = await mount(Toggle)
	const label = format.formatLabel(toggle.text, toggle.asset)
	await expect(component).toHaveText(label)
})

test('ToggleMenu', async ({mount}) => {
	const component = await mount(ToggleMenu)
	const labels = toggleMenu.map((button) => format.formatLabel(button.text, button.asset)).join(' ')

	await expect(component).toHaveText(labels)
})
