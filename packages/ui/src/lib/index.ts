// Reexport your entry components here
import './types/index'
import type {FatFuzzyUi} from '$types'

export type * from '$types'
/**
 * Headless components
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
import InputGroup from '$lib/components/blocks/inputs/InputGroup.svelte'
import InputRange from '$lib/components/blocks/inputs/InputRange.svelte'
import InputFile from '$lib/components/blocks/inputs/InputFile.svelte'

/**
 * Layout components
 */
import Burrito from '$lib/components/layouts/Burrito.svelte'
import Sidebar from '$lib/components/layouts/Sidebar.svelte'
import Stack from '$lib/components/layouts/Stack.svelte'
import Switcher from '$lib/components/layouts/Switcher.svelte'

/**
 * Recipes - Base
 */
import ButtonMenu from '$lib/components/recipes/menus/ButtonMenu.svelte'
import ToggleMenu from '$lib/components/recipes/menus/ToggleMenu/ToggleMenu.svelte'
import Settings from '$lib/components/recipes/forms/Settings.svelte'
import SignUp from '$lib/components/recipes/forms/SignUp.svelte'

import Nav from '$lib/components/recipes/navs/Nav.svelte'
import SkipLinks from '$lib/components/recipes/navs/SkipLinks.svelte'
import Breadcrumbs from '$lib/components/recipes/navs/Breadcrumbs.svelte'

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
import Cookies from '$lib/components/recipes/forms/Cookies.svelte'
import Toast from '$lib/components/blocks/overlays/Toast/Toast.svelte'
import ToastGroup from '$lib/components/blocks/overlays/Toast/ToastGroup.svelte'
// import InputPassword from '$lib/components/blocks/inputs/InputPassword.svelte'
// import InputFeedback from '$lib/components/blocks/inputs/InputFeedback.svelte'

// New: replace Reveal mechanisms
import ToggleReveal from '$lib/components/recipes/toggle/ToggleReveal.svelte'
import ToggleLink from '$lib/components/recipes/toggle/ToggleLink.svelte'
import ToggleTree from '$lib/components/recipes/toggle/ToggleTree.svelte'
import ToggleSettings from '$lib/components/recipes/toggle/ToggleSettings.svelte'

/**
 * Forms
 */
import SignUpUser from '$lib/forms/SignUpUser'
import AppContext from '$lib/forms/AppContext'

/**
 * Actors
 */
import Toaster from '$lib/components/blocks/overlays/Toast/actor.svelte.js'
import PopoverActor from '$lib/components/blocks/overlays/Popover/actor.svelte.js'

/**
 * Utilities
 */
import constants from '$lib/types/constants'
import * as clickOutside from '$lib/utils/browser/click-outside'
import format from '$lib/utils/format'
import styles from '$lib/utils/styles'
import FormValidator from '$lib/utils/browser/FormValidator.svelte'

/***************************************************
 * Prepare Exports
 **************************************************/
const utils = {
	format,
	styles,
	clickOutside,
	FormValidator,
}

const actors = {
	PopoverActor,
	Toaster,
}

const forms = {
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
	InputGroup,
	InputRange,
	InputFile,
}

const layouts = {
	Burrito,
	Stack,
	Switcher,
	Sidebar,
}

const recipes = {
	ButtonMenu,
	ToggleMenu,
	SignUp,
	SkipLinks,
	Nav,
}

const raw = {
	CSSTheme,
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
	Fieldset,
	Popover,
	// InputPassword,
	// InputFeedback,
	Image,
	Picture,
	Scrolly,
	ScrollyItem,
	Breadcrumbs,
	Settings,
	PageNav,
	PageHeader,
	Zoomer,
	Tabs,
	Cookies,
	Toast,
	ToastGroup,

	// New: replace Reveal mechanisms
	ToggleReveal,
	ToggleTree,
	ToggleLink,
	ToggleSettings,
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
	actors,
	utils,
	forms,
	constants,
} as FatFuzzyUi
