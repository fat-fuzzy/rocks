import type {UiState} from '$types'
import {page} from 'vitest/browser'
import {describe, it, expect, beforeEach} from 'vitest'
import {render} from 'vitest-browser-svelte'
import actor from '$lib/components/blocks/overlays/Popover/actor.svelte'
import Popover from './PopoverTest.svelte'
import {POPOVER_PROPS} from '$tests/fixtures/block-props'

describe(`Popover - a popover component`, () => {
	beforeEach(() => {
		actor.reset()
	})

	describe('showPopover', () => {
		it(`should show a popover that is collapsed on click`, async () => {
			const popover = POPOVER_PROPS[0]

			page.render(Popover)
			await page.getByRole('button', {name: popover.props.title}).click()
			const popoverContent = page.getByText(popover.expected.content)

			expect(popoverContent).toBeVisible()
		})
	})

	describe('hidePopover', () => {
		it(`should hide a popover that is expanded on click`, async () => {
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
			expect(actorPopover?.state).toBe(undefined)
		})

		it(`should hide an expanded popover if another popover is activated`, async () => {
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

		it(`should hide an expanded popover set to 'auto' if the user clicks outside the popover content`, async () => {
			const popover = POPOVER_PROPS[0]
			page.render(Popover)

			await page.getByRole('button', {name: popover.props.title}).click()
			const popoverContent = page.getByText(popover.expected.content)

			expect(popoverContent).toBeVisible()

			await page.getByText('Click outside').click()

			expect(popoverContent).not.toBeVisible()
		})

		it(`should not hide an expanded popover set to 'manual' if the user clicks outside the popover content`, async () => {
			const popover = POPOVER_PROPS[0]
			page.render(Popover)

			await page.getByRole('button', {name: popover.props.title}).click()
			const popoverContent = page.getByText(popover.expected.content)

			expect(popoverContent).toBeVisible()
		})

		it(`should hide an expanded popover if external event hides the popover via the PopoverActor`, async () => {
			const popover = POPOVER_PROPS[0]

			page.render(Popover, {count: 2, externalEvent: true})

			await page.getByRole('button', {name: popover.props.title}).click()
			const popoverRole = page.getByRole(popover.props.role)
			const popoverContent = page.getByText(popover.expected.content)

			expect(popoverRole).toBeInViewport()
			expect(popoverContent).toBeVisible()

			await page.getByText('Enter the popoverId').fill(popover.props.id)
			await page.getByText('Save and close').click()

			expect(popoverContent).not.toBeVisible()
		})

		it(`should hide a popover if the actor changes the popover's state to collapsed`, () => {
			const popover = POPOVER_PROPS[0]

			const {getByTestId} = render(Popover)

			const element = getByTestId(`${popover.props.id}-popover`)
			const popoverData = {
				id: popover.props.id,
				element: element.element() as HTMLElement,
				state: 'expanded' as UiState,
			}
			actor.addPopover(popoverData)
			expect(actor.popovers.length).toBe(1)

			actor.hidePopover(popover.props.id)
			const popoverContent = page.getByText(popover.expected.content)

			expect(popoverContent).not.toBeVisible()
		})

		it(`should show a popover if the actor changes the popover's state to expanded`, () => {
			const popover = POPOVER_PROPS[0]

			const {getByTestId} = render(Popover)

			const element = getByTestId(`${popover.props.id}-popover`)
			const popoverData = {
				id: popover.props.id,
				element: element.element() as HTMLElement,
				state: 'collapsed' as UiState,
			}
			actor.addPopover(popoverData)
			expect(actor.popovers.length).toBe(1)

			actor.showPopover(popover.props.id)
			const popoverContent = page.getByText(popover.expected.content)

			expect(popoverContent).toBeVisible()
		})
	})

	describe('destroy', () => {
		it(`should show a popover that is collapsed`, async () => {
			const popover = POPOVER_PROPS[0]

			const {unmount} = render(Popover)
			await page.getByRole('button', {name: popover.props.title}).click()
			const popoverContent = page.getByRole(popover.props.role)

			expect(popoverContent).toBeVisible()

			unmount()

			expect(actor.popovers.find((p) => p.id === popover.props.id)).toBe(
				undefined,
			)
		})
	})
})
