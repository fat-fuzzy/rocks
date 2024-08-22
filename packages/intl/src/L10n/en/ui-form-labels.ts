import type {Message} from '$types'

const LABELS: Record<string, Message> = {
	username: 'Username',
	email: 'Email',
	password: 'Password',
	confirm_password: 'Confirm Password',
}

export default {
	LABELS,
}
