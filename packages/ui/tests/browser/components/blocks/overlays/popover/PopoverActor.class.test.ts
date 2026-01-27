import type {UiState} from '$types'
import {page} from 'vitest/browser'
import {describe, it, expect, beforeEach} from 'vitest'
import {render} from 'vitest-browser-svelte'
import actor from '$lib/components/blocks/overlays/Popover/actor.svelte'
import Popover from './PopoverActor.svelte'

import {POPOVER_PROPS} from '$tests/fixtures/block-props'

describe(`PopoverActor - a class to manage popovers from external context`, () => {
	beforeEach(() => {
		actor.reset()
	})

	describe('reset', () => {
		it(`should reset popovers `, () => {
			const {getByTestId} = render(Popover)
			const popoverProps = POPOVER_PROPS[0].props
			const element = getByTestId(popoverProps.id)
			const popoverData = {
				id: popoverProps.id,
				element: element.element() as HTMLElement,
				state: 'collapsed' as UiState,
			}
			actor.addPopover(popoverData)
			expect(actor.popovers.length).toBe(1)

			actor.reset()
			expect(actor.popovers.length).toBe(0)
		})
	})

	describe('addPopover', () => {
		it(`should add a new popover to the actor's popover list`, () => {
			const {getByTestId} = render(Popover)
			const popoverProps = POPOVER_PROPS[0].props
			const element = getByTestId(popoverProps.id)
			const popoverData = {
				id: popoverProps.id,
				element: element.element() as HTMLElement,
				state: 'collapsed' as UiState,
			}

			actor.addPopover(popoverData)
			expect(actor.popovers[0]).toMatchObject(popoverData)
		})

		it(`should be idempotent`, () => {
			const {getByTestId} = render(Popover)
			const popoverProps = POPOVER_PROPS[0].props
			const element = getByTestId(popoverProps.id)
			const popoverData = {
				id: popoverProps.id,
				element: element.element() as HTMLElement,
				state: 'collapsed' as UiState,
			}

			actor.addPopover(popoverData)
			actor.addPopover(popoverData)
			expect(actor.popovers.length).toBe(1)
			expect(actor.popovers[0]).toMatchObject(popoverData)
		})

		it(`should expand a popover if added to actor with expanded state`, async () => {
			const {getByTestId} = render(Popover)
			const popover = POPOVER_PROPS[0]
			const element = getByTestId(popover.props.id)
			const popoverData = {
				id: popover.props.id,
				element: element.element() as HTMLElement,
				state: 'expanded' as UiState,
			}
			actor.addPopover(popoverData)
			const popoverContent = page.getByText(popover.expected.content)
			expect(popoverContent).toBeVisible()
		})
	})

	describe('getPopoverState', () => {
		it(`should correctly returns popover's expanded state`, () => {
			const {getByTestId} = render(Popover)
			const popoverProps = POPOVER_PROPS[0].props
			const element = getByTestId(popoverProps.id)
			const popoverData = {
				id: popoverProps.id,
				element: element.element() as HTMLElement,
				state: 'expanded' as UiState,
			}

			actor.addPopover(popoverData)
			const result = actor.getPopoverState(popoverProps.id)
			expect(result).toBe('expanded')
		})

		it(`should correctly returns popover's collapsed state`, () => {
			const {getByTestId} = render(Popover)
			const popoverProps = POPOVER_PROPS[0].props
			const element = getByTestId(popoverProps.id)
			const popoverData = {
				id: popoverProps.id,
				element: element.element() as HTMLElement,
				state: 'collapsed' as UiState,
			}

			actor.addPopover(popoverData)
			const result = actor.getPopoverState(popoverProps.id)
			expect(result).toBe('collapsed')
		})

		it(`should return nothing if the popover is not found in the actor's popovers`, () => {
			const popoverProps = POPOVER_PROPS[0].props
			const result = actor.getPopoverState(popoverProps.id)
			expect(result).toBe(undefined)
		})
	})

	describe('removePopover', () => {
		it(`should remove a popover from the actor's popover list`, () => {
			const popoverContext = page.render(Popover, {count: 2})

			const popover1 = POPOVER_PROPS[0]
			const element1 = popoverContext.getByTestId(popover1.props.id)

			const popoverData1 = {
				id: popover1.props.id,
				element: element1.element() as HTMLElement,
				state: 'collapsed' as UiState,
			}

			const popover2 = POPOVER_PROPS[1]
			const element2 = popoverContext.getByTestId(popover2.props.id)
			const popoverData2 = {
				id: popover2.props.id,
				element: element2.element() as HTMLElement,
				state: 'collapsed' as UiState,
			}

			actor.addPopover(popoverData1)
			actor.addPopover(popoverData2)

			expect(actor.popovers[0]).toMatchObject(popoverData1)
			expect(actor.popovers[1]).toMatchObject(popoverData2)
			expect(actor.popovers.length).toBe(2)

			actor.removePopover(popover1.props.id)

			expect(actor.popovers[0]).toMatchObject(popoverData2)
			expect(actor.popovers.length).toBe(1)
			expect(actor.popovers.find((p) => p.id === popover1.props.id)).toBe(
				undefined,
			)
		})
	})
})
