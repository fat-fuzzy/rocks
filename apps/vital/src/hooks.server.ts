import type {Handle} from '@sveltejs/kit'
import {sequence} from '@sveltejs/kit/hooks'
import {
	setSecHeaders,
	setPermissionsPolicy,
} from '$lib/server/hooks/setSecHeaders'

export const handle: Handle = sequence(
	setSecHeaders(),
	setPermissionsPolicy(),
) satisfies Handle
