import type {Message} from '$types'

const LABELS: Record<string, Message> = {
	username: `Nom d'utilisateur`,
	email: 'Email',
	password: 'Mot de passe',
	confirm_password: 'Confirmer le mot de passe',
}

export default {
	LABELS,
}
