// Reexport your entry components here
/// <reference path="./types/index.d.ts" />
import type {FatFuzzyUi} from '$types'
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
import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'
import Switch from '$lib/components/blocks/buttons/Switch/Switch.svelte'
import Toggle from '$lib/components/blocks/buttons/Toggle/Toggle.svelte'
import Feedback from '$lib/components/blocks/global/Feedback.svelte'
import Fieldset from '$lib/components/blocks/forms/Fieldset.svelte'
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
 * Recipes - Base
 */
import RevealMenu from '$lib/components/recipes/menus/RevealMenu.svelte'
import ButtonMenu from '$lib/components/recipes/menus/ButtonMenu.svelte'
import ToggleMenu from '$lib/components/recipes/menus/ToggleMenu/ToggleMenu.svelte'
import InputGroup from '$lib/components/recipes/forms/InputGroup.svelte'

import LogIn from '$lib/components/recipes/forms/LogIn.svelte'

import Nav from '$lib/components/recipes/navs/Nav.svelte'
import RevealNav from '$lib/components/recipes/navs/RevealNav.svelte'

import Header from '$lib/components/recipes/headers/Header.svelte'

/**
 * Recipes - Routes
 */
import LayoutSidebar from '$lib/components/recipes/content/LayoutSidebar.svelte'
import PageMain from '$lib/components/recipes/content/PageMain.svelte'

/**
 * Forms
 */
import {NavReveal} from '$lib/forms/nav-reveal.js'
import {SettingsReveal} from '$lib/forms/settings-reveal.js'
import {SettingsUpdate} from '$lib/forms/settings-update.js'
import {SidebarReveal} from '$lib/forms/sidebar-reveal.js'

/**
 * Utilities
 */
import constants from '$lib/types/constants.js'
import * as clickOutside from '$lib/utils/click-outside.js'
import format from '$lib/utils/format.js'

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
	Fieldset,
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
	InputGroup,
	LogIn,
	Nav,
	RevealNav,
	Header,
}

const content = {
	PageMain,
	LayoutSidebar,
}

const headless = {
	Head,
}

export default {
	headless,
	tokens,
	blocks,
	layouts,
	recipes,
	content,
	utils,
	forms,
	constants,
} as FatFuzzyUi
