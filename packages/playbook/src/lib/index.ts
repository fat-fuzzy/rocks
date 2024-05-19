// Reexport your entry components here

/**
 * Styles Api components
 * - Used to display documentation about UI library components and their options (=API) in documentation website
 */
import Api from '$lib/api/styles/Api.svelte'
import Token from '$lib/api/styles/Token.svelte'
import Element from '$lib/api/styles/Element.svelte'
import Collection from '$lib/api/styles/Collection.svelte'

import * as stylesApi from '$lib/api/styles'
import * as props from '$lib/api/props/'
import * as fixturesApi from '$lib/api/fixtures/js/'

/**
 * Forms
 */
import {DsStylesUpdate as form} from '$lib/forms/ds-styles-update'
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
	stylesApi,
	fixturesApi,
	props,
	form
}

export {api}
