import {test, expect} from '@playwright/experimental-ct-svelte'
import format from '../../../dist/utils/format'
import {getProps} from '../../../dist/api/fixtures/js/fixtures-api'

import Button from '../../../dist/components/blocks/buttons/Button.svelte'
import Toggle from '../../../dist/components/blocks/buttons/Toggle.svelte'

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
