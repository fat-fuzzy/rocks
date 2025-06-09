import type {FeedbackProps} from '$types'

class ToastChef {
	public toasts = $state<(Partial<FeedbackProps> & {id: string})[]>([])
	private toasterRef: HTMLElement | null = $state(null)
	private toasterHeight = $state(0)

	constructor() {}

	public initialize(toasterRef: HTMLElement) {
		this.toasterRef = toasterRef
	}

	public addToast(toast: Partial<FeedbackProps>) {
		const id = toast.id ?? String(this.toasts.length + 1)
		this.toasts = [...this.toasts, {...toast, id}]
	}

	public async cookToast(id: string, ref: HTMLOutputElement) {
		this.flipToast()
		await this.completeAnimations(id, ref)
		this.removeToast(id, ref)
	}

	private flipToast() {
		const last = this.toasterRef?.offsetHeight as number
		const delta = last - this.toasterHeight

		const animation = this.toasterRef?.animate(
			[{transform: `translateY(${delta}px)`}, {transform: 'translateY(0)'}],
			{
				duration: 150,
				easing: 'ease-out',
			},
		)

		if (animation) {
			animation.startTime = document.timeline.currentTime
		}

		this.toasterHeight = last
	}

	private async completeAnimations(
		id: string,
		ref: HTMLOutputElement,
	): Promise<string> {
		// eslint-disable-next-line no-async-promise-executor
		return new Promise(async (resolve) => {
			await Promise.all(
				ref.getAnimations().map((animation) => animation.finished),
			)

			resolve(id)
		})
	}

	private removeToast(id: string, ref: HTMLOutputElement) {
		this.toasts = this.toasts.filter((toast) => toast.id !== id)
		this.toasterHeight = this.toasterHeight - ref.offsetHeight
	}
}

const toastChef = new ToastChef()

export default toastChef
