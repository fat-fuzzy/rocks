// Reexport your entry components here
/**
 * Layout components
 */
import Burrito from './layouts/Burrito.svelte'
import Reveal from './layouts/Reveal.svelte'
import Sidebar from './layouts/Sidebar.svelte'
import Stack from './layouts/Stack.svelte'
import Switcher from './layouts/Switcher.svelte'

/**
 * Block components
 */

import Button from './blocks/buttons/Button.svelte'
import ButtonMenu from './blocks/buttons/ButtonMenu.svelte'
import RevealMenu from './blocks/buttons/RevealMenu.svelte'
import Toggle from './blocks/buttons/Toggle.svelte'
import ToggleMenu from './blocks/buttons/ToggleMenu.svelte'
// import Canvas from './blocks/media/Canvas.svelte'
import InputRadio from './blocks/forms/InputRadio.svelte'
import InputCheck from './blocks/forms/InputCheck.svelte'
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
	Switcher,
}
const blocks = {
	Button,
	ButtonMenu,
	RevealMenu,
	Toggle,
	ToggleMenu,
	// Canvas, TODO: init canvas with example Sketch
	InputRadio,
	InputCheck,
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

// TODO: see if I can use this to configure styles from assets (design tokens) in app project folder
const sass = {
	ui: './styles/app/ui/_main.scss',
	doc: './styles/app/doc/_main.scss',
	website: './styles/app/client/_main.scss',
}

// [TODO:] Not sure this is useful
async function getSass(theme) {
	const themedStyles = await import(sass[theme])
	return themedStyles
}

export {blocks, layouts, api, utils, stores, constants, getSass}
