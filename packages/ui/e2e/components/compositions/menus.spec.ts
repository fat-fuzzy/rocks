import {test, expect} from '@playwright/experimental-ct-svelte'
import format from '../../../dist/utils/format'
import {getFixtures} from '../../../dist/api/fixtures/js/'
import ButtonMenu from '../../../dist/components/recipes/menus/ButtonMenu.svelte'
import ToggleMenu from '../../../dist/components/recipes/menus/ToggleMenu.svelte'
import RevealMenu from '../../../dist/components/recipes/menus/RevealMenu.svelte'

test.use({viewport: {width: 500, height: 500}})

const category = 'recipes'

test('ButtonMenu', async ({mount}) => {
	// 1. Init
	const props = getFixtures({category, component: 'ButtonMenu'})
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
	const props = getFixtures({category, component: 'ToggleMenu'})
	const component = await mount(ToggleMenu, {props})

	// 2. Test display
	const labels = props.items.map((button) => format.formatLabel(button.text, button.asset))
	await expect(component).toHaveText(labels.join(' '))

	// 3. Test behaviour
	// TODO
})

test('RevealMenu', async ({mount}) => {
	// 1. Init
	const props = getFixtures({category, component: 'RevealMenu'})
	const component = await mount(RevealMenu, {props})

	// 2. Test display
	const labels = props.items.map((button) => format.formatLabel(button.text, button.asset))
	await expect(component).toHaveText(`${props.title} ${labels.join(' ')}`)

	// 3. Test behaviour
	// TODO
})
