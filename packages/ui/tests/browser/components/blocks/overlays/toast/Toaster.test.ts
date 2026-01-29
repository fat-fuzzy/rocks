import type {UiStatus} from '$types'

import {describe, it, expect, beforeEach} from 'vitest'
import {page} from 'vitest/browser'
import actor from '$lib/components/blocks/overlays/Toast/actor.svelte'
import ToastTest from './ToastTest.svelte'

const toast = {
	id: 'info-toast',
	text: 'Toaster is ready!',
	status: 'info' as UiStatus,
}

describe.only(`Toaster - a class to manage Toasts`, () => {
	beforeEach(() => {
		actor.reset()
	})

	describe('init', () => {
		it(`should initialize a toaster correctly`, () => {
			page.render(ToastTest)

			expect(actor.toaster).toBeDefined()
		})
	})

	describe('addToast', () => {
		it(`should put a fresh toast in the toaster`, () => {
			page.render(ToastTest)
			actor.addToast(toast)

			expect(actor.toasts.find((p) => p.id === toast.id)).toMatchObject(toast)
		})
	})

	describe('cookToast', () => {
		it(`should display a toast when it's toasted`, async () => {
			page.render(ToastTest)
			actor.addToast(toast)

			// Cooking toast ...
			const toastContent = page.getByText(toast.text)
			expect(toastContent).toBeDefined()
		})
	})

	describe('eatToast', () => {
		it.only(`should eat a toast once it's done`, async () => {
			page.render(ToastTest)
			actor.addToast(toast)

			// Toast should be done ...
			setTimeout(() => {
				const toastContent = page.getByText(toast.text)
				expect(toastContent).not.toBeDefined()
			}, 3000)
		})
	})
})
