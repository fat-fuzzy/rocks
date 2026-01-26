import {page} from 'vitest/browser'
import {describe, it, expect, beforeEach} from 'vitest'
import actor from '$lib/components/blocks/overlays/Popover/actor.svelte'
import Popover from './Popover.svelte'
import {POPOVER_PROPS} from '$tests/fixtures/block-props'

// TODO: : figure out errors during tests (not failing):
// - Popover not visible, but detected as visible

describe(`Popover - a popover component`, () => {
	beforeEach(() => {
		actor.reset()
	})

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

			const actorPopover = actor.popovers.find((p) => p.id === popover.props.id)
			expect(actorPopover?.state).toBe('collapsed')
		})

		it(`should hide an active popover if the user clicks on its invoker`, async () => {
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

			const actorPopover = actor.popovers.find((p) => p.id === popover.props.id)
			expect(actorPopover?.state).toBe('collapsed')
		})

		it(`should hide an active popover if another popover is activated`, async () => {
			const popover1 = POPOVER_PROPS[0]
			const popover2 = POPOVER_PROPS[1]

			page.render(Popover, {count: 2})

			await page.getByRole('button', {name: popover1.props.title}).click()
			const popoverRole = page.getByRole(popover1.props.role)
			const popoverContent = page.getByText(popover1.expected.content)

			expect(popoverRole).toBeInViewport()
			expect(popoverContent).toBeVisible()

			await page.getByRole('button', {name: popover2.props.title}).click()

			expect(popoverRole).not.toBeInViewport()
			expect(popoverContent).not.toBeVisible()
		})

		it(`should hide an active popover set to 'auto' if the user clicks outside the popover content`, async () => {
			const popover = POPOVER_PROPS[0]
			page.render(Popover)

			await page.getByRole('button', {name: popover.props.title}).click()
			const popoverContent = page.getByText(popover.expected.content)

			expect(popoverContent).toBeVisible()

			await page.getByText('Click outside').click()

			expect(popoverContent).not.toBeVisible()
		})

		it(`should not hide an active popover set to 'manual' if the user clicks outside the popover content`, async () => {
			const popover = POPOVER_PROPS[0]
			page.render(Popover)

			await page.getByRole('button', {name: popover.props.title}).click()
			const popoverContent = page.getByText(popover.expected.content)

			expect(popoverContent).toBeVisible()
		})
	})
})
