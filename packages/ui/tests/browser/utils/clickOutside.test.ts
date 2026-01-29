import {test, expect, describe} from 'vitest'
import {userEvent} from 'vitest/browser'
import {render} from 'vitest-browser-svelte'
import ClickOutside from './ClickOutsideTest.svelte'

describe('click-outside.dom.ts - Dispatch an event on click outside of a DOM node', () => {
	test('Dispatches clickoutside event when clicking outside the element', async () => {
		const {getByText} = render(ClickOutside)
		const clickArea = getByText('Outside!')
		await userEvent.click(clickArea)
		await expect.element(getByText('Clicked outside!')).toBeInTheDocument()
	})

	test('Does not dispatch clickoutside event when clicking inside the element', async () => {
		const {getByText} = render(ClickOutside)
		const clickArea = getByText('Click outside me!')
		await userEvent.click(clickArea)
		await expect.element(getByText('Clicked outside!')).not.toBeInTheDocument()
	})

	test('Removes event listener on destroy', async () => {
		const {getByText, unmount} = render(ClickOutside)

		// Verify the listener works
		const clickArea = getByText('Outside!')
		await userEvent.click(clickArea)
		await expect.element(getByText('Clicked outside!')).toBeInTheDocument()

		// Unmount the component to trigger destroy
		unmount()

		// Clicking should do nothing
		await userEvent.click(document.body)
		await expect.element(getByText('Clicked outside!')).not.toBeInTheDocument()
	})
})
