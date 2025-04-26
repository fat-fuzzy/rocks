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
import Reveal from '$lib/components/layouts/reveal/Reveal.svelte'
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
import RevealContext from '$lib/components/recipes/forms/RevealContext.svelte'

import SignUp from '$lib/components/recipes/forms/SignUp.svelte'

import Nav from '$lib/components/recipes/navs/Nav.svelte'
import RevealNav from '$lib/components/recipes/navs/RevealNav.svelte'
import PageNav from '$lib/components/recipes/navs/PageNav.svelte'
import Breadcrumbs from '$lib/components/recipes/navs/Breadcrumbs.svelte'

import Header from '$lib/components/recipes/header/Header.svelte'
import HeaderNav from '$lib/components/recipes/header/HeaderNav.svelte'
import HeaderGrid from '$lib/components/recipes/header/HeaderGrid.svelte'

/**
 * Recipes - Content
 */
import LayoutGrid from '$lib/components/recipes/grid/LayoutGrid.svelte'
import LayoutSidebar from '$lib/components/recipes/content/LayoutSidebar.svelte'
import PageMain from '$lib/components/recipes/content/PageMain.svelte'
import PageRails from '$lib/components/recipes/grid/PageRails.svelte'
import PageScrolly from '$lib/components/recipes/content/PageScrolly.svelte'

/**
 * Raw - CSS Layout templates: use as guides, not as drop-in components
 */
import CSSTheme from '$lib/components/raw/css-theme.svelte'
import CSSMetro from '$lib/components/raw/css-grid-metro.svelte'
import CSSRailway from '$lib/components/raw/css-grid-railway.svelte'
import CSSSteam from '$lib/components/raw/css-grid-steam.svelte'
import CSSTgv from '$lib/components/raw/css-grid-tgv.svelte'
import CSSTram from '$lib/components/raw/css-grid-tram.svelte'
import CSSVoyager from '$lib/components/raw/css-grid-voyager.svelte'
/**
 * Draft components
 */
import Fieldset from '$lib/components/blocks/inputs/Fieldset.svelte'
import InputGroup from '$lib/components/blocks/inputs/InputGroup.svelte'
import Magic from '$lib/components/blocks/global/Magic.svelte'
import Image from '$lib/components/blocks/media/Image.svelte'
import Picture from '$lib/components/blocks/media/Picture.svelte'
import Aside from '$lib/components/recipes/content/Aside.svelte'
import Zoomer from '$lib/components/recipes/content/Zoomer.svelte'
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
import AppContext from '$lib/forms/app-context.svelte.js'

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
	AppContext,
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

const raw = {CSSMetro, CSSRailway, CSSSteam, CSSTgv, CSSTram, CSSVoyager}

const content = {
	Aside,
	LayoutGrid,
	LayoutSidebar,
	PageMain,
	PageRails,
}

const drafts = {
	CSSTheme,
	Fieldset,
	Popover,
	// InputPassword,
	// InputFeedback,
	InputGroup,
	Image,
	Picture,
	Scrolly,
	ScrollyItem,
	Breadcrumbs,
	HeaderNav,
	HeaderGrid,
	Settings,
	PageNav,
	RevealContext,
	PageScrolly,
	Zoomer,
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
	raw,
	content,
	utils,
	forms,
	constants,
} as FatFuzzyUi
