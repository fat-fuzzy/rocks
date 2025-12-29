import {userEvent} from 'vitest/browser'
import {test, expect, describe} from 'vitest'
import {render} from 'vitest-browser-svelte'
import ClickOutside from './ClickOutside.svelte'

describe('click-outside.ts - Dispatch an event on click outside of a DOM node', () => {
	test('Dispatches clickoutside event', async () => {
		const {getByText} = render(ClickOutside)
		const clickArea = getByText('Outside!')
		await userEvent.click(clickArea)
		await expect.element(getByText('Clicked outside!')).toBeInTheDocument()
	})

	test('Removes event listener on destroy', async () => {
		const {getByText, unmount} = render(ClickOutside)

		// Verify the listener works
		const clickArea = getByText('Outside!')
		await userEvent.click(clickArea)
		await expect.element(getByText('Clicked outside!')).toBeInTheDocument()

		// Unmount the component to trigger destroy
		unmount()

		// Clicking should do nothing (no error should occur)
		await userEvent.click(document.body)
	})
})
