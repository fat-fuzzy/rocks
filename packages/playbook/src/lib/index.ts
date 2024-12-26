// Reexport your entry components here

/// <reference path="./types/index.d.ts" />
/**
 * Styles Api components
 * - Used to display documentation about UI library components and their options (=API) in documentation website
 */
import Api from '$lib/components/Api.svelte'
import Token from '$lib/components/Token.svelte'
import Element from '$lib/components/Element.svelte'
import Collection from '$lib/components/Collection.svelte'
import Playbook from '$lib/components/Playbook.svelte'
import PropsDoc from '$lib/components/PropsDoc.svelte'
import PropsDemo from '$lib/components/PropsDemo.svelte'
import PlaybookCollection from '$lib/components/PlaybookCollection.svelte'
import PlaybookElement from '$lib/components/PlaybookElement.svelte'

import * as stylesApi from '$lib/api/styles.api'
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
import PlaybookStore from '$lib/api/store.svelte'

/**
 * Tests Api components
 * - Used to display documentation about UI library components and their options (=API) in documentation website
 */

/***************************************************
 * Prepare Exports
 **************************************************/
const api = {
	Playbook,
	Api,
	Collection,
	Token,
	Element,
	PlaybookStore,
	PropsDoc,
	PropsDemo,
	PlaybookCollection,
	PlaybookElement,
	stylesApi,
	props,
}

const forms = {
	DsContextReveal,
	DsStateUpdate,
	DsStylesUpdate,
}

export {api, forms}
