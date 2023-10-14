import {test, expect} from '@playwright/experimental-ct-svelte'
import format from '../../../dist/utils/format'
import {getProps} from '../../../dist/api/fixtures/js/fixtures-api'

import Button from '../../../dist/components/blocks/buttons/Button.svelte'
import ButtonMenu from '../../../dist/components/blocks/buttons/ButtonMenu.svelte'
import Toggle from '../../../dist/components/blocks/buttons/Toggle.svelte'
import ToggleMenu from '../../../dist/components/blocks/buttons/ToggleMenu.svelte'

test.use({viewport: {width: 500, height: 500}})

const category = 'blocks'

test('Button', async ({mount}) => {
	// 1. Init
	let clicked = false
	const props = getProps({category, component: 'Button'})
	const component = await mount(Button, {
		props: {
			...props,
			onClick: () => {
				clicked = true
			},
		},
	})

	// 2. Test display
	const label = format.formatLabel(props.text, props.asset)
	await expect(component).toHaveText(label)

	// 3. Test behaviour
	await component.click()
	expect(clicked).toBeTruthy()
})

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

test('Toggle', async ({mount}) => {
	// 1. Init
	const props = getProps({category, component: 'Toggle'})
	const component = await mount(Toggle, {props})

	// 2. Test display
	const label = format.formatLabel(props.text, props.asset)
	await expect(component).toHaveText(label)

	// 3. Test behaviour
	// TODO
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
