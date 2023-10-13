import {test, expect} from '@playwright/experimental-ct-svelte'
import Button from '../../../dist/components/blocks/buttons/Button.svelte'
import ButtonMenu from '../../../dist/components/blocks/buttons/ButtonMenu.svelte'
import Toggle from '../../../dist/components/blocks/buttons/Toggle.svelte'
import ToggleMenu from '../../../dist/components/blocks/buttons/ToggleMenu.svelte'

test.use({viewport: {width: 500, height: 500}})

test('Button', async ({mount}) => {
	const component = await mount(Button)
	await expect(component).toHaveText('💡 Idea')
})

test('ButtonMenu', async ({mount}) => {
	const component = await mount(ButtonMenu)
	await expect(component).toHaveText('👾 Vader 🐙 Ollie 🐳 Moby')
})

test('Toggle', async ({mount}) => {
	const component = await mount(Toggle)
	await expect(component).toHaveText('❤️ Favorite')
})

test('ToggleMenu', async ({mount}) => {
	const component = await mount(ToggleMenu)
	await expect(component).toHaveText('💡 Idea 🦁 Profile ❤️ Favorite')
})
