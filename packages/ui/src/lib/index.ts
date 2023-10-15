// Reexport your entry components here
/**
 * Layout components
 */
import Burrito from '$lib/components/layouts/Burrito.svelte'
import Reveal from '$lib/components/layouts/Reveal.svelte'
import Sidebar from '$lib/components/layouts/Sidebar.svelte'
import Stack from '$lib/components/layouts/Stack.svelte'
import Switcher from '$lib/components/layouts/Switcher.svelte'

/**
 * Block components
 */

import Button from '$lib/components/blocks/buttons/Button.svelte'
import Toggle from '$lib/components/blocks/buttons/Toggle.svelte'
import ButtonMenu from '$lib/components/blocks/buttons/ButtonMenu.svelte'
import ToggleMenu from '$lib/components/blocks/buttons/ToggleMenu.svelte'
// import Feedback from '$lib/components/blocks/cards/Feedback.svelte'
// import Canvas from '$lib/components/blocks/media/Canvas.svelte'
import Fieldset from '$lib/components/blocks/forms/Fieldset.svelte'
import InputCheck from '$lib/components/blocks/forms/InputCheck.svelte'
import InputRadio from '$lib/components/blocks/forms/InputRadio.svelte'
import InputRange from '$lib/components/blocks/forms/InputRange.svelte'
import InputFile from '$lib/components/blocks/forms/InputFile.svelte'
import Nav from '$lib/components/blocks/navs/Nav.svelte'
// import Sketch from '$lib/components/blocks/graphics/Sketch.svelte'

/**
 * Compositions - Base
 */
import Header from '$lib/components/compositions/Header.svelte'
import RevealMenu from '$lib/components/compositions/RevealMenu.svelte'
import RevealNav from '$lib/components/compositions/RevealNav.svelte'

/**
 * Compositions - Graphics
 */
import Geometry from '$lib/components/graphics/Geometry.svelte'
import Player from '$lib/components/graphics/Player.svelte'
import Position from '$lib/components/graphics/Position.svelte'
import Rotation from '$lib/components/graphics/Rotation.svelte'
import Scale from '$lib/components/graphics/Scale.svelte'
import Sketch from '$lib/components/graphics/Sketch.svelte'

/**
 * Styles Api components
 * - Used to display documentation about UI library components and their options (=API) in documentation website
 */
import Api from '$lib/api/styles/Api.svelte'
import Element from '$lib/api/styles/Element.svelte'
import Collection from '$lib/api/styles/Collection.svelte'
import * as stylesApi from '$lib/api/styles/styles-api'
import * as fixturesApi from '$lib/api/fixtures/js/fixtures-api'

/**
 * Tests Api components
 * - Used to display documentation about UI library components and their options (=API) in documentation website
 */
import Test from '$lib/api/tests/TestComponent.svelte'

/**
 * Api webcomponents - WIP
 * - Idea:  be able to test UI Library for different apps using web components to encapsulate styles - not working yet
 */
// import StyleCapsule from '$lib/api/StyleCapsule.wc.svelte'

/**
 * Stores
 */
import * as theme from '$lib/stores/theme'
import * as ui from '$lib/stores/ui'
import * as intl from '$lib/stores/intl'
import * as stylesStore from '$lib/stores/api'

/**
 * Utilities
 */
import * as constants from '$lib/types/constants'
import * as clickOutside from '$lib/utils/click-outside'

/***************************************************
 * Prepare Exports
 **************************************************/
const utils = {
	clickOutside,
}
const stores = {
	theme,
	ui,
	intl,
}

const blocks = {
	Button,
	Toggle,
	ButtonMenu,
	ToggleMenu,
	Fieldset,
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

const graphics = {
	Geometry,
	Player,
	Position,
	Rotation,
	Scale,
	Sketch,
}

// TODO: rename this export : stylesApi
const api = {
	Api,
	Collection,
	Element,
	// StyleCapsule,
	fixturesApi,
	stylesApi,
	stylesStore,
}

const testsApi = {
	Test,
}

// TODO: see if I can use this to configure styles from assets (design tokens) in app project folder
const sass = {
	ui: '$lib/styles/theme/ui/_index.scss',
	doc: '$lib/styles/theme/doc/_index.scss',
	play: '$lib/styles/theme/play/_index.scss',
	sandbox: '$lib/styles/theme/sandbox/_index.scss',
}

// [TODO:] Not sure this is useful
async function getSass(theme) {
	const themedStyles = await import(sass[theme])
	return themedStyles
}

export {blocks, layouts, compositions, graphics, api, testsApi, utils, stores, constants, getSass}
