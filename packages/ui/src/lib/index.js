// Reexport your entry components here
/**
 * Layout components
 */
import Reveal from './layouts/Reveal.svelte'
import Sidebar from './layouts/Sidebar.svelte'
import Stack from './layouts/Stack.svelte'
import Burrito from './layouts/Burrito.svelte'

/**
 * Block components
 */

import Button from './blocks/buttons/Button.svelte'
import ButtonMenu from './blocks/buttons/ButtonMenu.svelte'
import RevealMenu from './blocks/buttons/RevealMenu.svelte'
import Toggle from './blocks/buttons/Toggle.svelte'
import ToggleMenu from './blocks/buttons/ToggleMenu.svelte'
// import Canvas from './blocks/media/Canvas.svelte'
import Upload from './blocks/forms/Upload.svelte'
import Feedback from './blocks/cards/Feedback.svelte'
import Nav from './blocks/navs/Nav.svelte'
import RevealNav from './blocks/navs/RevealNav.svelte'
// import Sketch from './blocks/graphics/Sketch.svelte'

/**
 * Api components
 * - Used to display documentation about UI library components and their options (=API) in documentation website
 */
import Element from './api/Element.svelte'
import Collection from './api/Collection.svelte'

/**
 * Stores
 */
import * as gfx from './stores/gfx'
import * as theme from './stores/theme'
import * as ui from './stores/ui'
import * as intl from './stores/intl'

/**
 * Utilities
 */
import * as constants from './types/constants'
import * as clickOutside from './utils/click-outside'

/***************************************************
 * Prepare Exports
 **************************************************/
const utils = {
	clickOutside,
}
const stores = {
	gfx,
	theme,
	ui,
	intl,
}
const layouts = {
	Burrito,
	Reveal,
	Sidebar,
	Stack,
}
const blocks = {
	Button,
	ButtonMenu,
	RevealMenu,
	Toggle,
	ToggleMenu,
	// Canvas, TODO: init canvas with example Sketch
	Upload,
	Nav,
	RevealNav,
	// Sketch,
	Feedback,
}

const api = {
	Element,
	Collection,
}

const sass = {
	default: './sass/styles-default.scss',
	doc: './styles/styles-doc.scss',
	client: './styles/styles-client.scss',
}

// [TODO:] Not sure this is useful
async function getSass(theme) {
	const themedStyles = await import(sass[theme])
	return themedStyles
}

export {blocks, layouts, api, utils, stores, constants, getSass}
