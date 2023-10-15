import {test, expect} from '@playwright/experimental-ct-svelte'
import format from '../../../dist/utils/format'
import {getProps} from '../../../dist/api/fixtures/js/fixtures-api'
import ButtonMenu from '../../../dist/components/compositions/menus/ButtonMenu.svelte'
import ToggleMenu from '../../../dist/components/compositions/menus/ToggleMenu.svelte'

test.use({viewport: {width: 500, height: 500}})

const category = 'compositions'

test('ButtonMenu', async ({mount}) => {
	// 1. Init
	const props = getProps({category, component: 'ButtonMenu'})
	const component = await mount(ButtonMenu, {props})

	// 2. Test display
	const labels = props.items.map((button) => format.formatLabel(button.text, button.asset))
	await expect(component).toHaveText(labels.join(' '))

	// 3. Test behaviour
	await component.getByText(labels[0]).click()
	// expect(clicked).toBeTruthy() // TODO: fix
})

test('ToggleMenu', async ({mount}) => {
	// 1. Init
	const props = getProps({category, component: 'ToggleMenu'})
	const component = await mount(ToggleMenu, {props})

	// 2. Test display
	const labels = props.items.map((button) => format.formatLabel(button.text, button.asset))
	await expect(component).toHaveText(labels.join(' '))

	// 3. Test behaviour
	// TODO
})
