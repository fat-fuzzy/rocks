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
import EscapeHtml from '$lib/components/blocks/global/EscapeHtml.svelte'
import Popover from '$lib/components/blocks/overlays/Popover.svelte'
import Dialog from '$lib/components/blocks/overlays/Dialog.svelte'

import InputCheck from '$lib/components/blocks/inputs/InputCheck.svelte'
import InputRadio from '$lib/components/blocks/inputs/InputRadio.svelte'
import InputRange from '$lib/components/blocks/inputs/InputRange.svelte'
import InputFile from '$lib/components/blocks/inputs/InputFile.svelte'

/**
 * Layout components
 */
import Burrito from '$lib/components/layouts/Burrito.svelte'
import Reveal from '$lib/components/layouts/Reveal.svelte'
import Sidebar from '$lib/components/layouts/Sidebar.svelte'
import Stack from '$lib/components/layouts/Stack.svelte'
import Switcher from '$lib/components/layouts/Switcher.svelte'

/**
 * Recipes - Base
 */
import RevealMenu from '$lib/components/recipes/menus/RevealMenu.svelte'
import ButtonMenu from '$lib/components/recipes/menus/ButtonMenu.svelte'
import ToggleMenu from '$lib/components/recipes/menus/ToggleMenu/ToggleMenu.svelte'
import Settings from '$lib/components/recipes/forms/Settings.svelte'
import RevealSettings from '$lib/components/recipes/forms/RevealSettings.svelte'

import SignUp from '$lib/components/recipes/forms/SignUp.svelte'

import Nav from '$lib/components/recipes/navs/Nav.svelte'
import RevealNav from '$lib/components/recipes/navs/RevealNav.svelte'
import Breadcrumbs from '$lib/components/recipes/navs/Breadcrumbs.svelte'

import Header from '$lib/components/recipes/header/Header.svelte'
import HeaderNav from '$lib/components/recipes/header/HeaderNav.svelte'

/**
 * Recipes - Content
 */
import LayoutSidebar from '$lib/components/recipes/content/LayoutSidebar.svelte'
import PageMain from '$lib/components/recipes/content/PageMain.svelte'
import PageTabs from '$lib/components/recipes/content/PageTabs.svelte'
import PageScrolly from '$lib/components/recipes/content/PageScrolly.svelte'

/**
 * Draft components
 */
import Fieldset from '$lib/components/blocks/inputs/Fieldset.svelte'
import InputGroup from '$lib/components/blocks/inputs/InputGroup.svelte'
import Magic from '$lib/components/blocks/global/Magic.svelte'
import Image from '$lib/components/blocks/media/Image.svelte'
import Picture from '$lib/components/blocks/media/Picture.svelte'
import Aside from '$lib/components/recipes/content/Aside.svelte'
import Scrolly from '$lib/components/recipes/animations/scroll/Scrolly.svelte'
import ScrollyItem from '$lib/components/recipes/animations/scroll/ScrollyItem.svelte'
import Tabs from '$lib/components/recipes/tabs/Tabs.svelte'
import Cookies from '$lib/components/recipes/forms/Cookies.svelte'
// import InputPassword from '$lib/components/blocks/inputs/InputPassword.svelte'
// import InputFeedback from '$lib/components/blocks/inputs/InputFeedback.svelte'

/**
 * Forms
 */
import UiReveal from '$lib/forms/ui-reveal.js'
import SignUpUser from '$lib/forms/ui-sample-signup.js'
import SettingsUpdate from '$lib/forms/settings-update.js'

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
	UiReveal,
	SettingsUpdate,
	SignUpUser,
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
	Magic,
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

const recipes = {
	ButtonMenu,
	ToggleMenu,
	RevealMenu,
	SignUp,
	Nav,
	RevealNav,
	Header,
}

const content = {
	PageMain,
	LayoutSidebar,
}

const drafts = {
	Fieldset,
	Popover,
	// InputPassword,
	// InputFeedback,
	InputGroup,
	Image,
	Picture,
	Aside,
	Scrolly,
	ScrollyItem,
	Breadcrumbs,
	HeaderNav,
	Settings,
	RevealSettings,
	PageScrolly,
	PageTabs,
	Tabs,
	Cookies,
}

const headless = {
	Head,
	EscapeHtml,
}

export default {
	drafts,
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
