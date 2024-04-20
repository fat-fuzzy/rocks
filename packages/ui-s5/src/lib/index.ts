// Reexport your entry components here

/**
 * Headless components
 */
import Head from '$lib/components/blocks/global/Head.svelte'

/**
 * Layout components
 */
import Color from '$lib/components/tokens/Color.svelte'
import Typography from '$lib/components/tokens/Typography.svelte'

/**
 * Block components
 */
import Button from '$lib/components/blocks/buttons/Button.svelte'
import Expand from '$lib/components/blocks/buttons/Expand.svelte'
import Switch from '$lib/components/blocks/buttons/Switch.svelte'
import Toggle from '$lib/components/blocks/buttons/Toggle.svelte'
import Feedback from '$lib/components/blocks/global/Feedback.svelte'
import InputCheck from '$lib/components/blocks/forms/InputCheck.svelte'
import InputRadio from '$lib/components/blocks/forms/InputRadio.svelte'
import InputRange from '$lib/components/blocks/forms/InputRange.svelte'
import InputFile from '$lib/components/blocks/forms/InputFile.svelte'

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
import ButtonMenu from '$lib/components/recipes/menus/ButtonMenu.svelte'
import ToggleMenu from '$lib/components/recipes/menus/ToggleMenu.svelte'
import RevealMenu from '$lib/components/recipes/menus/RevealMenu.svelte'

import LogIn from '$lib/components/recipes/forms/LogIn.svelte'

import Nav from '$lib/components/recipes/navs/Nav.svelte'
import RevealNav from '$lib/components/recipes/navs/RevealNav.svelte'

import Header from '$lib/components/recipes/headers/Header.svelte'

/**
 * Forms
 */
import {NavReveal} from '$lib/forms/nav-reveal'
import {SettingsReveal} from '$lib/forms/settings-reveal'
import {SettingsUpdate} from '$lib/forms/settings-update'
import {SidebarReveal} from '$lib/forms/sidebar-reveal'
import {DsContextReveal} from '$lib/forms/ds-context-reveal'
import {DsStylesUpdate} from '$lib/forms/ds-styles-update'
import {DsStateUpdate} from '$lib/forms/ds-state-update'
import {DsTabsUpdate} from '$lib/forms/ds-tabs-update'

/**
 * Stores
 */
import * as settings from '$lib/stores/settings'
import * as ui from '$lib/stores/ui'
import * as intl from '$lib/stores/intl'

/**
 * Utilities
 */
import constants from '$lib/types/constants'
import * as clickOutside from '$lib/utils/click-outside'
import format from '$lib/utils/format'

/***************************************************
 * Prepare Exports
 **************************************************/
const utils = {
	format,
	clickOutside,
}

const forms = {
	NavReveal,
	SidebarReveal,
	SettingsReveal,
	SettingsUpdate,
	DsContextReveal,
	DsStateUpdate,
	DsStylesUpdate,
	DsTabsUpdate,
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
	Button,
	Expand,
	Switch,
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

const recipes = {
	ButtonMenu,
	ToggleMenu,
	RevealMenu,
	LogIn,
	Nav,
	RevealNav,
	Header,
}

// TODO: rename this export : stylesApi
const headless = {
	Head,
}


export {headless, tokens, blocks, layouts, recipes, utils, forms, stores, constants}
