// Reexport your entry components here

/**
 * Styles Api components
 * - Used to display documentation about UI library components and their options (=API) in documentation website
 */
import Api from '$lib/components/Api.svelte'
import Token from '$lib/components/Token.svelte'
import Element from '$lib/components/Element.svelte'
import Collection from '$lib/components/Collection.svelte'

import * as stylesApi from '$lib/api/styles.api'
import * as props from '$lib/props'

/**
 * Forms
 */
import {DsStylesUpdate as form} from '$lib/forms/ds-styles-update'

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
	Api,
	Collection,
	Token,
	Element,
	PlaybookStore,
	stylesApi,
	props,
	form,
}

export {api}
