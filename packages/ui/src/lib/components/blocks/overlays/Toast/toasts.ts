import type {FeedbackProps} from '$types'
import toaster from '$lib/components/blocks/overlays/Toast/actor.svelte'

export const errorToast = (text: string) => {
	const toast: Partial<FeedbackProps> = {
		text,
		status: 'error',
		asset: 'poop',
	}

	toaster.addToast(toast)
}

export const successToast = (text: string) => {
	const toast: Partial<FeedbackProps> = {
		text,
		status: 'success',
		asset: 'tada',
	}

	toaster.addToast(toast)
}
