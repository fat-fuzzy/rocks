import type {FeedbackProps} from '$types'

/**
 * Adapted from : https://web.dev/articles/building/a-toast-component
 */
class Toaster {
	public toasts: {
		id: string
		toast?: HTMLOutputElement
	}[] = $state([])
	private toaster: HTMLElement | null = null
	private toasterHeight = 0

	constructor() {}

	public initialize(toaster: HTMLElement) {
		this.toaster = toaster
	}

	public addToast(toast: Partial<FeedbackProps>) {
		const id = window.crypto.randomUUID()
		this.toasts = [...this.toasts, {id, ...toast}]
	}

	public async cookToast(id: string, toast: HTMLOutputElement) {
		this.flipToast(toast)
		await toaster.completeAnimations(id, toast)
		this.eatToast(id, toast)
	}

	private flipToast(toast: HTMLOutputElement) {
		const first = this.toaster?.offsetHeight as number
		const delta = first - this.toasterHeight
		const {matches: motionOK} = window.matchMedia(
			'(prefers-reduced-motion: no-preference)',
		)
		let animation
		if (this.toasts.length && motionOK) {
			animation = toast.animate(
				[{transform: `translateY(${delta}px)`}, {transform: 'translateY(0)'}],
				{
					duration: 3000,
					easing: 'ease-out',
				},
			)
		}

		if (animation) {
			animation.startTime = document.timeline.currentTime
		}
		this.toasterHeight = first
	}

	private async completeAnimations(
		id: string,
		output: HTMLOutputElement,
	): Promise<string> {
		return new Promise(async (resolve) => {
			await Promise.all(
				output.getAnimations().map((animation) => animation.finished),
			)

			resolve(id)
		})
	}

	private eatToast(id: string, output: HTMLOutputElement) {
		this.toasts = this.toasts.filter((toast) => toast.id !== id)
		this.toasterHeight = this.toasterHeight - output.offsetHeight
	}
}

const toaster = new Toaster()

export default toaster
