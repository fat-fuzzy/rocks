import type {DialogState, DialogProps} from '$types'

/**
 * Manages Dialog state (modal or non-modal), one dialog at a time
 */
class DialogActor {
	public dialog: HTMLDialogElement | undefined
	public state: DialogState
	public props: DialogProps = $state({})

	constructor() {
		this.state = 'idle'
	}

	public init({
		label = 'Dialog',
		modal = false,
		size = 'md',
		level = 3,
		children,
		cta,
		position = 'center',
		color = undefined,
		message = undefined,
		onSubmit = undefined,
		onClose = undefined,
	}: DialogProps) {
		this.props = {
			label,
			modal,
			size,
			level,
			color,
			position,
			children,
			cta,
			message,
			onSubmit,
			onClose,
		}
	}

	public setDialog(dialog: HTMLDialogElement) {
		this.dialog = dialog
	}

	public show() {
		if (!this.dialog) {
			return
		}
		this.state = 'loading'
		if (this.props?.modal) {
			this.dialog.showModal()
		} else {
			this.dialog.show()
		}
		this.state = 'visible'
	}

	public close() {
		if (this.props?.onClose) {
			this.props.onClose()
		}
		this.state = 'closed'
		this.hide()
	}

	public cancel() {
		this.state = 'cancelled'
		this.hide()
	}

	public submit() {
		if (this.props?.onSubmit) {
			this.props.onSubmit()
		}
		this.hide()
		this.state = 'idle'
	}

	private hide() {
		if (!this.dialog) {
			return
		}

		this.props = {}
		this.dialog.close(this.state)
	}
}

const actor = new DialogActor()

export default actor
