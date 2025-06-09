import type {FeedbackProps} from '$types'
import {UiStatus} from '$types'
import toaster from '$lib/components/blocks/overlays/Toast/actor.svelte'

export const errorToast = (text: string) => {
	const toast: Partial<FeedbackProps> = {
		text,
		status: UiStatus.error,
		asset: 'poop',
	}

	toaster.addToast(toast)
}

export const successToast = (text: string) => {
	const toast: Partial<FeedbackProps> = {
		text,
		status: UiStatus.success,
		asset: 'tada',
	}

	toaster.addToast(toast)
}
