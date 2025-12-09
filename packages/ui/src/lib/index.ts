// Reexport your entry components here
/// <reference path="./types/index.ts" />

// export type * from '$types'
/**
 * Headless components
 */
// export {default as Head} from '$lib/components/blocks/global/Head.svelte'

// export {default as Color} from '$lib/components/tokens/Color.svelte'
// export {default as Typography} from '$lib/components/tokens/Typography.svelte'

// export {default as Button} from '$lib/components/blocks/buttons/Button.svelte'
// export {default as Expand} from '$lib/components/blocks/buttons/Expand/Expand.svelte'
// export {default as Switch} from '$lib/components/blocks/buttons/Switch/Switch.svelte'
// export {default as Toggle} from '$lib/components/blocks/buttons/Toggle/Toggle.svelte'

// export {default as Feedback} from '$lib/components/blocks/global/Feedback.svelte'
// export {default as EscapeHtml} from '$lib/components/blocks/global/EscapeHtml.svelte'
// export {default as Popover} from '$lib/components/blocks/overlays/Popover/Popover.svelte'

// export {default as InputCheck} from '$lib/components/blocks/inputs/InputCheck.svelte'
// export {default as InputRadio} from '$lib/components/blocks/inputs/InputRadio.svelte'
// export {default as InputRange} from '$lib/components/blocks/inputs/InputRange.svelte'
// export {default as InputFile} from '$lib/components/blocks/inputs/InputFile.svelte'
// export {default as Fieldset} from '$lib/components/blocks/inputs/Fieldset.svelte'
// export {default as InputGroup} from '$lib/components/blocks/inputs/InputGroup.svelte'

// export {default as Burrito} from '$lib/components/layouts/Burrito.svelte'
// export {default as Reveal} from '$lib/components/layouts/reveal/Reveal.svelte'
// export {default as Sidebar} from '$lib/components/layouts/Sidebar.svelte'
// export {default as Stack} from '$lib/components/layouts/Stack.svelte'
// export {default as Switcher} from '$lib/components/layouts/Switcher.svelte'

// export {default as RevealMenu} from '$lib/components/recipes/menus/RevealMenu.svelte'
// export {default as ButtonMenu} from '$lib/components/recipes/menus/ButtonMenu.svelte'
// export {default as ToggleMenu} from '$lib/components/recipes/menus/ToggleMenu/ToggleMenu.svelte'
// export {default as Settings} from '$lib/components/recipes/forms/Settings.svelte'
// export {default as RevealContext} from '$lib/components/recipes/forms/RevealContext.svelte'
// export {default as SignUp} from '$lib/components/recipes/forms/SignUp.svelte'

// export {default as Nav} from '$lib/components/recipes/navs/Nav.svelte'
// export {default as RevealNav} from '$lib/components/recipes/navs/RevealNav.svelte'
// export {default as Breadcrumbs} from '$lib/components/recipes/navs/Breadcrumbs.svelte'
// export {default as PageNav} from '$lib/components/recipes/navs/PageNav.svelte'
// export {default as ExpandLink} from '$lib/components/recipes/navs/ExpandLink.svelte'

// export {default as HeaderNav} from '$lib/components/recipes/header/HeaderNav.svelte'

// export {default as LayoutGrid} from '$lib/components/recipes/grid/LayoutGrid.svelte'
// export {default as LayoutSidebar} from '$lib/components/recipes/content/LayoutSidebar.svelte'
// export {default as PageMain} from '$lib/components/recipes/content/PageMain.svelte'
// export {default as PageRails} from '$lib/components/recipes/grid/PageRails.svelte'
// export {default as PageContext} from '$lib/components/recipes/content/PageContext.svelte'
// export {default as PageHeader} from '$lib/components/recipes/content/PageHeader.svelte'

// export {default as CSSTheme} from '$lib/components/raw/css-theme.svelte'
// export {default as CSSMetro} from '$lib/components/raw/css-grid-metro.svelte'
// export {default as CSSRailway} from '$lib/components/raw/css-grid-railway.svelte'
// export {default as CSSSteam} from '$lib/components/raw/css-grid-steam.svelte'
// export {default as CSSTgv} from '$lib/components/raw/css-grid-tgv.svelte'
// export {default as CSSTram} from '$lib/components/raw/css-grid-tram.svelte'
// export {default as CSSVoyager} from '$lib/components/raw/css-grid-voyager.svelte'
// export {default as CSSUrbanist} from '$lib/components/raw/css-grid-urbanist.svelte'

// export {default as Magic} from '$lib/components/blocks/global/Magic.svelte'
// export {default as Image} from '$lib/components/blocks/media/Image.svelte'
// export {default as Picture} from '$lib/components/blocks/media/Picture.svelte'
// export {default as Zoomer} from '$lib/components/blocks/overlays/Zoomer.svelte'
// export {default as Toast} from '$lib/components/blocks/overlays/Toast/Toast.svelte'
// export {default as ToastGroup} from '$lib/components/blocks/overlays/Toast/ToastGroup.svelte'

// export {default as Scrolly} from '$lib/components/recipes/animations/scroll/Scrolly.svelte'
// export {default as ScrollyItem} from '$lib/components/recipes/animations/scroll/ScrollyItem.svelte'
// export {default as Tabs} from '$lib/components/recipes/tabs/Tabs.svelte'
// export {default as Cookies} from '$lib/components/recipes/forms/Cookies.svelte'

// export {default as Toaster} from '$lib/components/blocks/overlays/Toast/actor.svelte.js'
// export {default as PopoverActor} from '$lib/components/blocks/overlays/Popover/actor.svelte.js'

/**
 * Base components
 */
import Head from '$lib/components/blocks/global/Head.svelte'
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
import Popover from '$lib/components/blocks/overlays/Popover/Popover.svelte'
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
import Breadcrumbs from '$lib/components/recipes/navs/Breadcrumbs.svelte'

import HeaderNav from '$lib/components/recipes/header/HeaderNav.svelte'

/**
 * Recipes - Content
 */
import LayoutGrid from '$lib/components/recipes/grid/LayoutGrid.svelte'
import LayoutSidebar from '$lib/components/recipes/content/LayoutSidebar.svelte'
import PageMain from '$lib/components/recipes/content/PageMain.svelte'
import PageRails from '$lib/components/recipes/grid/PageRails.svelte'
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
import CSSUrbanist from '$lib/components/raw/css-grid-urbanist.svelte'
/**
 * Draft components
 */
import Fieldset from '$lib/components/blocks/inputs/Fieldset.svelte'
import InputGroup from '$lib/components/blocks/inputs/InputGroup.svelte'
import Magic from '$lib/components/blocks/global/Magic.svelte'
import Image from '$lib/components/blocks/media/Image.svelte'
import Picture from '$lib/components/blocks/media/Picture.svelte'
import PageContext from '$lib/components/recipes/content/PageContext.svelte'
import PageNav from '$lib/components/recipes/navs/PageNav.svelte'
import PageHeader from '$lib/components/recipes/content/PageHeader.svelte'
import Zoomer from '$lib/components/blocks/overlays/Zoomer.svelte'
import Scrolly from '$lib/components/recipes/animations/scroll/Scrolly.svelte'
import ScrollyItem from '$lib/components/recipes/animations/scroll/ScrollyItem.svelte'
import Tabs from '$lib/components/recipes/tabs/Tabs.svelte'
import ExpandLink from '$lib/components/recipes/navs/ExpandLink.svelte'
import Cookies from '$lib/components/recipes/forms/Cookies.svelte'
import Toast from '$lib/components/blocks/overlays/Toast/Toast.svelte'
import ToastGroup from '$lib/components/blocks/overlays/Toast/ToastGroup.svelte'
// import InputPassword from '$lib/components/blocks/inputs/InputPassword.svelte'
// import InputFeedback from '$lib/components/blocks/inputs/InputFeedback.svelte'

/**
 * Forms
 */
import UiReveal from '$lib/forms/ui-reveal.js'
import SignUpUser from '$lib/forms/ui-sample-signup.js'
import AppContext from '$lib/forms/app-context.svelte.js'

/**
 * Actors
 */
import Toaster from '$lib/components/blocks/overlays/Toast/actor.svelte.js'
import PopoverActor from '$lib/components/blocks/overlays/Popover/actor.svelte.js'

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

const actors = {
	PopoverActor,
	Toaster,
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
}

const raw = {
	CSSMetro,
	CSSRailway,
	CSSSteam,
	CSSTgv,
	CSSTram,
	CSSVoyager,
	CSSUrbanist,
}

const content = {
	LayoutGrid,
	LayoutSidebar,
	PageMain,
	PageRails,
	PageContext,
}

const drafts = {
	CSSTheme,
	Fieldset,
	Popover,
	// InputPassword,
	// InputFeedback,
	ExpandLink,
	InputGroup,
	Image,
	Picture,
	Scrolly,
	ScrollyItem,
	Breadcrumbs,
	HeaderNav,
	Settings,
	PageNav,
	PageHeader,
	RevealContext,
	Zoomer,
	Tabs,
	Cookies,
	Toast,
	ToastGroup,
}

const headless = {
	Head,
	EscapeHtml,
}

const UI = {
	drafts,
	headless,
	tokens,
	blocks,
	layouts,
	recipes,
	raw,
	content,
}

const TOOLS = {
	actors,
	utils,
	forms,
	constants,
}

export default {
	...UI,
	...TOOLS,
}
