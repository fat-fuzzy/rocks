// Reexport your entry components here
import './types/index'

export type * from '$types'
/**
 * Styles Api components
 * - Used to display documentation about UI library components and their options (=API) in documentation website
 */
import PlaybookCollection from '$lib/components/PlaybookCollection.svelte'
import PlaybookElement from '$lib/components/PlaybookElement.svelte'
import PlaybookRaw from '$lib/components/PlaybookRaw.svelte'
import Playbook from '$lib/components/Playbook.svelte'

import StylesApi from '$lib/api/styles.svelte'
import * as props from '$lib/props'

/**
 * Forms
 */
import DsStylesUpdate from '$lib/forms/ds-styles-update'
import DsContextReveal from '$lib/forms/ds-context-reveal'
import DsStateUpdate from '$lib/forms/ds-state-update'

/**
 * Stores
 */
import {PlaybookActor} from '$lib/api/actor.svelte'

/**
 * Tests Api components
 * - Used to display documentation about UI library components and their options (=API) in documentation website
 */

/***************************************************
 * Prepare Exports
 **************************************************/

const actions = {
	DsContextReveal,
	DsStateUpdate,
	DsStylesUpdate,
}

const playbook = {
	PlaybookCollection,
	PlaybookElement,
	PlaybookRaw,
	Playbook,
	StylesApi,
	PlaybookActor,
	props,
	actions,
}

export default playbook
