import type {Handle} from '@sveltejs/kit'
import {sequence} from '@sveltejs/kit/hooks'

import {setStyles} from '$lib/server/hooks/setStyles'
import {setSecHeaders} from '$lib/server/hooks/setSecHeaders'

export const handle: Handle = sequence(
	setSecHeaders(),
	setStyles(),
) satisfies Handle
