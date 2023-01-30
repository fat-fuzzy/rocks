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
import Toggle from './blocks/buttons/Toggle.svelte'
import ButtonMenu from './blocks/buttons/ButtonMenu.svelte'
import ToggleMenu from './blocks/buttons/ToggleMenu.svelte'
import Feedback from './blocks/cards/Feedback.svelte'
// import Canvas from './blocks/media/Canvas.svelte'
import InputCheck from './blocks/forms/InputCheck.svelte'
import InputRadio from './blocks/forms/InputRadio.svelte'
import InputRange from './blocks/forms/InputRange.svelte'
import InputFile from './blocks/forms/InputFile.svelte'
import Nav from './blocks/navs/Nav.svelte'
// import Sketch from './blocks/graphics/Sketch.svelte'

/**
 * Composition components
 */
import Header from './compositions/Header.svelte'
import RevealMenu from './compositions/RevealMenu.svelte'
import RevealNav from './compositions/RevealNav.svelte'

/**
 * Api components
 * - Used to display documentation about UI library components and their options (=API) in documentation website
 */
import Api from './api/Api.svelte'
import Element from './api/Element.svelte'
import Collection from './api/Collection.svelte'
import * as stylesApi from './api/styles-api'
import StyleCapsule from './api/StyleCapsule.wc.svelte'
import StyleCapsuleDoc from './api/StyleCapsuleDoc.wc.svelte'
import StyleCapsuleWebsite from './api/StyleCapsuleWebsite.wc.svelte'

/**
 * Stores
 */
import * as gfx from './stores/gfx'
import * as theme from './stores/theme'
import * as ui from './stores/ui'
import * as intl from './stores/intl'
import * as stylesStore from './stores/api'

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

const blocks = {
	Button,
	Toggle,
	ButtonMenu,
	ToggleMenu,
	// Feedback,
	// Canvas, TODO: init canvas with example Sketch
	Nav,
	// Sketch,
	InputCheck,
	InputRadio,
	InputRange,
	InputFile,
}

const layouts = {
	Burrito,
	Reveal,
	Stack,
	Switcher,
	Sidebar,
}

const compositions = {
	Header,
	RevealNav, // TODO: use content option in UI lib API in docs
	RevealMenu, // TODO: use content option in UI lib API in docs
}

const api = {
	Api,
	Collection,
	Element,
	stylesApi,
	stylesStore,
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

export {blocks, layouts, compositions, api, utils, stores, constants, getSass}
