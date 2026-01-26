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
				state: 'collapsed',
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
				state: 'collapsed',
			}

			actor.addPopover(popoverData)
			expect(actor.popovers[0]).toMatchObject(popoverData)
		})
	})

	describe('isActive', () => {
		it(`should correctly detect a popover in an active state`, () => {
			const {getByTestId} = render(Popover)
			const popoverProps = POPOVER_PROPS[0].props
			const element = getByTestId(popoverProps.id)
			const popoverData = {
				id: popoverProps.id,
				element: element.element() as HTMLElement,
				state: 'expanded',
			}

			actor.addPopover(popoverData)
			const result = actor.isActive(popoverProps.id)
			expect(result).toBe(true)
		})

		it(`should correctly detect a popover in an inactive state`, () => {
			const {getByTestId} = render(Popover)
			const popoverProps = POPOVER_PROPS[0].props
			const element = getByTestId(popoverProps.id)
			const popoverData = {
				id: popoverProps.id,
				element: element.element() as HTMLElement,
				state: 'collapsed',
			}

			actor.addPopover(popoverData)
			const result = actor.isActive(popoverProps.id)
			expect(result).toBe(false)
		})

		it(`should return false if the popover is not found in the actor's popovers`, () => {
			const popoverProps = POPOVER_PROPS[0].props
			const result = actor.isActive(popoverProps.id)
			expect(result).toBe(false)
		})
	})

	describe('removePopover', () => {
		it(`should remove a popover from the actor's popover list`, () => {
			const popoverContext = page.render(Popover)

			const popoverProps1 = POPOVER_PROPS[0]
			const element1 = popoverContext.getByTestId(popoverProps1.props.id)

			const popoverData1 = {
				id: popoverProps1.props.id,
				element: element1.element() as HTMLElement,
				state: 'collapsed',
			}

			const popoverProps2 = POPOVER_PROPS[1]
			const element2 = popoverContext.getByTestId(popoverProps2.props.id)
			const popoverData2 = {
				id: popoverProps2.props.id,
				element: element2.element() as HTMLElement,
				state: 'collapsed',
			}

			actor.addPopover(popoverData1)
			actor.addPopover(popoverData2)

			expect(actor.popovers[0]).toMatchObject(popoverData1)
			expect(actor.popovers[1]).toMatchObject(popoverData2)
			expect(actor.popovers.length).toBe(2)

			actor.removePopover(popoverProps1.props.id)

			expect(actor.popovers[0]).toMatchObject(popoverData2)
			expect(actor.popovers.length).toBe(1)
			expect(actor.popovers.find((p) => p.id === popoverProps1.props.id)).toBe(
				undefined,
			)
		})
	})
})
