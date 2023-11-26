// Reexport your entry components here

/**
 * Layout components
 */
import Color from '$lib/components/tokens/Color.svelte'
import Typography from '$lib/components/tokens/Typography.svelte'

/**
 * Block components
 */
import ActionLabel from '$lib/components/blocks/global/ActionLabel.svelte'
import Button from '$lib/components/blocks/buttons/Button.svelte'
import Toggle from '$lib/components/blocks/buttons/Toggle.svelte'
import Feedback from '$lib/components/blocks/global/Feedback.svelte'
// import Canvas from '$lib/components/blocks/media/Canvas.svelte'
// import Fieldset from '$lib/components/blocks/forms/Fieldset.svelte'
import InputCheck from '$lib/components/blocks/forms/InputCheck.svelte'
import InputRadio from '$lib/components/blocks/forms/InputRadio.svelte'
import InputRange from '$lib/components/blocks/forms/InputRange.svelte'
import InputFile from '$lib/components/blocks/forms/InputFile.svelte'
// import Sketch from '$lib/components/blocks/graphics/Sketch.svelte'

/**
 * Layout components
 */
import Burrito from '$lib/components/layouts/Burrito.svelte'
import Reveal from '$lib/components/layouts/Reveal.svelte'
import RevealAuto from '$lib/components/layouts/RevealAuto.svelte'
import Sidebar from '$lib/components/layouts/Sidebar.svelte'
import Stack from '$lib/components/layouts/Stack.svelte'
import Switcher from '$lib/components/layouts/Switcher.svelte'

/**
 * Compositions - Base
 */
import ButtonMenu from '$lib/components/compositions/menus/ButtonMenu.svelte'
import ToggleMenu from '$lib/components/compositions/menus/ToggleMenu.svelte'
import RevealMenu from '$lib/components/compositions/menus/RevealMenu.svelte'

import LogIn from '$lib/components/compositions/forms/LogIn.svelte'

import Nav from '$lib/components/compositions/navs/Nav.svelte'
import RevealNav from '$lib/components/compositions/navs/RevealNav.svelte'

import Header from '$lib/components/compositions/headers/Header.svelte'
// import PageHeader from '$lib/components/compositions/headers/PageHeader.svelte'

// import Page from '$lib/components/compositions/content/Page.svelte'
// import PageLogIn from '$lib/components/compositions/content/PageLogIn.svelte'

/**
 * Compositions - Graphics
 */
import Sketch from '$lib/components/graphics/Sketch.svelte'
import Player from '$lib/components/graphics/Player.svelte'

import Geometry from '$lib/components/graphics/Geometry.svelte'
import Position from '$lib/components/graphics/Position.svelte'
import Rotation from '$lib/components/graphics/Rotation.svelte'
import Scale from '$lib/components/graphics/Scale.svelte'

/**
 * Styles Api components
 * - Used to display documentation about UI library components and their options (=API) in documentation website
 */
import Api from '$lib/api/styles/Api.svelte'
import Token from '$lib/api/styles/Token.svelte'
import Element from '$lib/api/styles/Element.svelte'
import Collection from '$lib/api/styles/Collection.svelte'
// import StyleFamily from '$lib/api/styles/StyleFamily.svelte'

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
import * as settings from '$lib/stores/settings'
import * as ui from '$lib/stores/ui'
import * as intl from '$lib/stores/intl'

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
	settings,
	ui,
	intl,
}

const tokens = {
	Color,
	Typography,
}

const blocks = {
	// ActionLabel,
	Button,
	Toggle,
	Feedback,
	// Fieldset,
	InputCheck,
	InputRadio,
	InputRange,
	InputFile,
}

const layouts = {
	Burrito,
	Reveal,
	RevealAuto,
	Stack,
	Switcher,
	Sidebar,
}

const compositions = {
	ButtonMenu,
	ToggleMenu,
	RevealMenu, // TODO: use content option in UI lib API in docs
	LogIn,
	Nav,
	RevealNav, // TODO: use content option in UI lib API in docs
	Header,
	// PageHeader,
	// Page,
	// PageLogIn,
}

const graphics = {
	// Canvas, TODO: init canvas with example Sketch
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
	Token,
	Element,
	// StyleFamily,
	// StyleCapsule,
	fixturesApi,
	stylesApi,
}

const testsApi = {
	Test,
}

export {tokens, blocks, layouts, compositions, graphics, api, utils, stores, constants}
