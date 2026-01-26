import {page} from 'vitest/browser'
import {describe, it, expect} from 'vitest'
import Popover from './Popover.svelte'
import {POPOVER_PROPS} from '$tests/fixtures/block-props'

// TODO: : figure out errors during tests (not failing):
// - Popover not visible, but detected as visible

describe(`Popover - a popover component`, () => {
	describe('showPopover', () => {
		it(`should show a popover that is inactive`, async () => {
			const popover = POPOVER_PROPS[0]

			page.render(Popover)
			await page.getByRole('button', {name: popover.props.title}).click()
			const popoverContent = page.getByRole(popover.props.role)

			expect(popoverContent).toBeVisible()
		})
	})

	describe('hidePopover', () => {
		it(`should hide a popover that is active`, async () => {
			const popover = POPOVER_PROPS[0]
			page.render(Popover)

			await page.getByRole('button', {name: popover.props.title}).click()
			let popoverRole = page.getByRole(popover.props.role)
			let popoverContent = page.getByText(popover.expected.content)

			expect(popoverRole).toBeInViewport()
			expect(popoverContent).toBeVisible()

			await page.getByRole('button', {name: popover.props.title}).click()
			popoverRole = page.getByTestId(popover.props.id)
			popoverContent = page.getByText(popover.expected.content)

			expect(popoverRole).not.toBeInViewport()
			expect(popoverContent).not.toBeVisible()
		})
	})
})
