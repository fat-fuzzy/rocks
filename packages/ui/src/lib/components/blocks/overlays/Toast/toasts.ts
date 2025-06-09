import type {FeedbackProps} from '$types'
import {UiStatus} from '$types'
import {toastChef} from '$lib/components/blocks/overlays/Toast/actor.svelte'

export const errorToast = (text: string) => {
	const toast: Partial<FeedbackProps> = {
		text,
		status: UiStatus.error,
		asset: 'poop',
	}

	toastChef.addToast(toast)
}
