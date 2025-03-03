// Reexport your entry components here

/// <reference path="./types/index.d.ts" />
/**
 * Styles Api components
 * - Used to display documentation about UI library components and their options (=API) in documentation website
 */
import Api from '$lib/components/Api.svelte'
import Token from '$lib/components/Token.svelte'
import Element from '$lib/components/Element.svelte'
import PropsDoc from '$lib/components/PropsDoc.svelte'
import PropsDemo from '$lib/components/PropsDemo.svelte'
import PlaybookCollection from '$lib/components/PlaybookCollection.svelte'
import PlaybookElement from '$lib/components/PlaybookElement.svelte'
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
	Api,
	Token,
	Element,
	PropsDoc,
	PropsDemo,
	PlaybookCollection,
	PlaybookElement,
	Playbook,
	StylesApi,
	PlaybookActor,
	props,
	actions,
}

export default playbook
