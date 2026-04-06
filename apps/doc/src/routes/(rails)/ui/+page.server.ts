import type {Actions} from './$types'
import {commonActions} from '$lib/server/actions/page-actions'
import {playbookActions} from '$lib/server/actions/playbook-actions'

export const actions = {
	...commonActions,
	...playbookActions,
} satisfies Actions
