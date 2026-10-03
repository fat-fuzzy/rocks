import {sequence, type Handle} from '@sveltejs/kit/hooks'
import {setStyles} from '#lib/server/hooks/setStyles.js'
import {
	setSecHeaders,
	setPermissionsPolicy,
} from '#lib/server/hooks/setSecHeaders.js'

export const handle: Handle = sequence(
	setSecHeaders(),
	setPermissionsPolicy(),
	setStyles(),
) satisfies Handle
