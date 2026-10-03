import type {Actions} from './$types'
import {commonActions} from '#lib/server/actions/page-actions.js'
import {playbookActions} from '#lib/server/actions/playbook-actions.js'

export const actions = {
	...commonActions,
	...playbookActions,
} satisfies Actions
