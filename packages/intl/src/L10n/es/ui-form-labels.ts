import type {Message} from '$types'

const LABELS: Record<string, Message> = {
	username: 'Nombre de Usuario',
	email: 'Email',
	password: 'Contraseña',
	confirm_password: 'Confirmar la Contraseña',
}

export default {
	LABELS,
}
