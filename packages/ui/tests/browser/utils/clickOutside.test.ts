import {userEvent} from 'vitest/browser'
import {test, expect} from 'vitest'
import {render} from 'vitest-browser-svelte'
import ClickOutside from './ClickOutside.svelte'

test('click-outside.ts - Dispatch an event on click outside of a DOM node', async () => {
	const {getByText} = render(ClickOutside)
	const clickArea = getByText('Outside!')
	await userEvent.click(clickArea)
	await expect.element(getByText('Clicked outside!')).toBeInTheDocument()
})
