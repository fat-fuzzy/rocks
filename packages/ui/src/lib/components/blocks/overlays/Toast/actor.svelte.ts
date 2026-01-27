import type {FeedbackProps} from '$types'

/**
 * Adapted from : https://web.dev/articles/building/a-toast-component
 */

type ToastState = {
	id: string
	toast?: HTMLOutputElement
}

class Toaster {
	public toasts: ToastState[] = $state([])
	toaster: HTMLElement | undefined = undefined
	toasterHeight = 0

	constructor() {}

	public reset() {
		this.toasts = []
	}

	public init(toaster: HTMLElement) {
		this.toaster = toaster
	}

	public addToast(toast: Partial<FeedbackProps>) {
		const id = toast.id ?? crypto.randomUUID()
		this.toasts = [...this.toasts, {id, ...toast}]
	}

	public async cookToast(id: string, toast: HTMLOutputElement) {
		this.flipToast(toast)
		await toaster.completeAnimations(id, toast)
		this.eatToast(id, toast)
	}

	flipToast(toast: HTMLOutputElement) {
		const first = this.toaster?.offsetHeight as number
		const delta = first - this.toasterHeight
		const {matches: motionOK} = window.matchMedia(
			'(prefers-reduced-motion: no-preference)',
		)

		if (this.toasts.length && motionOK) {
			const animation = toast.animate(
				[{transform: `translateY(${delta}px)`}, {transform: 'translateY(0)'}],
				{
					duration: 3000,
					easing: 'ease-out',
				},
			)
			animation.startTime = document.timeline.currentTime
		}

		this.toasterHeight = first
	}

	async completeAnimations(
		id: string,
		output: HTMLOutputElement,
	): Promise<string> {
		// eslint-disable-next-line
		return new Promise(async (resolve) => {
			await Promise.all(
				output.getAnimations().map((animation) => animation.finished),
			)

			resolve(id)
		})
	}

	eatToast(id: string, output: HTMLOutputElement) {
		this.toasts = this.toasts.filter((toast) => toast.id !== id)
		this.toasterHeight = this.toasterHeight - output.offsetHeight
	}
}

const toaster = new Toaster()

export default toaster
