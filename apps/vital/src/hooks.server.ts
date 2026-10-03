import type {Handle} from '@sveltejs/kit/hooks'
import {sequence} from '@sveltejs/kit/hooks'
import {
	setSecHeaders,
	setPermissionsPolicy,
} from '#lib/server/hooks/setSecHeaders.js'

export const handle: Handle = sequence(
	setSecHeaders(),
	setPermissionsPolicy(),
) satisfies Handle
