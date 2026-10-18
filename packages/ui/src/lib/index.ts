// Reexport your entry components here
import './types/index'
import type {FatFuzzyUi} from '#types'

export type * from '#types'
/**
 * Headless components
 */
import Head from '#lib/components/blocks/global/Head.svelte'
import Color from '#lib/components/tokens/Color.svelte'
import Typography from '#lib/components/tokens/Typography.svelte'

export {Head}
export {Color}
export {Typography}

/**
 * Block components
 */
import Button from '#lib/components/blocks/buttons/Button.svelte'
import Expand from '#lib/components/blocks/buttons/Expand/Expand.svelte'
import Switch from '#lib/components/blocks/buttons/Switch/Switch.svelte'
import Toggle from '#lib/components/blocks/buttons/Toggle/Toggle.svelte'

import Feedback from '#lib/components/blocks/global/Feedback.svelte'
import EscapeHtml from '#lib/components/blocks/global/EscapeHtml.svelte'
import Popover from '#lib/components/blocks/overlays/Popover/Popover.svelte'
import Input from '#lib/components/blocks/inputs/Input.svelte'
import InputCheck from '#lib/components/blocks/inputs/InputCheck.svelte'
import InputRadio from '#lib/components/blocks/inputs/InputRadio.svelte'
import InputGroup from '#lib/components/blocks/inputs/InputGroup.svelte'
import InputRange from '#lib/components/blocks/inputs/InputRange.svelte'
import InputSidecar from '#lib/components/blocks/inputs/InputSidecar.svelte'
import InputFile from '#lib/components/blocks/inputs/InputFile.svelte'

export {Button}
export {Expand}
export {Switch}
export {Toggle}
export {Feedback}
export {EscapeHtml}
export {Popover}
export {Input}
export {InputCheck}
export {InputRadio}
export {InputGroup}
export {InputRange}
export {InputSidecar}
export {InputFile}

/**
 * Layout components
 */
import Burrito from '#lib/components/layouts/Burrito.svelte'
import Sidebar from '#lib/components/layouts/Sidebar.svelte'
import Stack from '#lib/components/layouts/Stack.svelte'
import Switcher from '#lib/components/layouts/Switcher.svelte'

export {Burrito}
export {Sidebar}
export {Stack}
export {Switcher}

/**
 * Recipes - Base
 */
import ButtonMenu from '#lib/components/recipes/menus/ButtonMenu.svelte'
import ToggleMenu from '#lib/components/recipes/menus/ToggleMenu/ToggleMenu.svelte'
import SignUp from '#lib/components/recipes/forms/SignUp.svelte'

import Nav from '#lib/components/recipes/navs/Nav.svelte'
import SkipLinks from '#lib/components/recipes/navs/SkipLinks.svelte'
import Breadcrumbs from '#lib/components/recipes/navs/Breadcrumbs.svelte'

export {ButtonMenu}
export {ToggleMenu}
export {SignUp}
export {Nav}
export {SkipLinks}
export {Breadcrumbs}

/**
 * Recipes - Content
 */
import LayoutGrid from '#lib/components/recipes/grid/LayoutGrid.svelte'
import LayoutSidebar from '#lib/components/recipes/content/LayoutSidebar.svelte'
import PageMain from '#lib/components/recipes/content/PageMain.svelte'
import PageRails from '#lib/components/recipes/grid/PageRails.svelte'

export {LayoutGrid}
export {LayoutSidebar}
export {PageMain}
export {PageRails}
/**
 * Raw - CSS Layout templates: use as guides, not as drop-in components
 */
import CSSTheme from '#lib/components/raw/css-theme.svelte'
import CSSMetro from '#lib/components/raw/css-grid-metro.svelte'
import CSSRailway from '#lib/components/raw/css-grid-railway.svelte'
import CSSSteam from '#lib/components/raw/css-grid-steam.svelte'
import CSSTgv from '#lib/components/raw/css-grid-tgv.svelte'
import CSSTram from '#lib/components/raw/css-grid-tram.svelte'
import CSSVoyager from '#lib/components/raw/css-grid-voyager.svelte'
import CSSUrbanist from '#lib/components/raw/css-grid-urbanist.svelte'

export {CSSTheme}
export {CSSMetro}
export {CSSRailway}
export {CSSSteam}
export {CSSTgv}
export {CSSTram}
export {CSSVoyager}
export {CSSUrbanist}
/**
 * Draft components
 */
import Fieldset from '#lib/components/blocks/inputs/Fieldset.svelte'
import Magic from '#lib/components/blocks/global/Magic.svelte'
import Image from '#lib/components/blocks/media/Image.svelte'
import Picture from '#lib/components/blocks/media/Picture.svelte'
import PageContext from '#lib/components/recipes/content/PageContext.svelte'
import PageNav from '#lib/components/recipes/navs/PageNav.svelte'
import PageHeader from '#lib/components/recipes/content/PageHeader.svelte'
import Zoomer from '#lib/components/blocks/overlays/Zoomer.svelte'
import Scrolly from '#lib/components/recipes/animations/scroll/Scrolly.svelte'
import ScrollyItem from '#lib/components/recipes/animations/scroll/ScrollyItem.svelte'
import Tabs from '#lib/components/recipes/tabs/Tabs.svelte'
import Cookies from '#lib/components/recipes/forms/Cookies.svelte'
import Toast from '#lib/components/blocks/overlays/Toast/Toast.svelte'
import ToastGroup from '#lib/components/blocks/overlays/Toast/ToastGroup.svelte'
// import InputPassword from '#lib/components/blocks/inputs/InputPassword.svelte'
// import InputFeedback from '#lib/components/blocks/inputs/InputFeedback.svelte'

export {Fieldset}
export {Magic}
export {Image}
export {Picture}
export {PageContext}
export {PageNav}
export {PageHeader}
export {Zoomer}
export {Scrolly}
export {ScrollyItem}
export {Tabs}
export {Cookies}
export {Toast}
export {ToastGroup}

// New: replace Reveal mechanisms
import ToggleReveal from '#lib/components/recipes/toggle/ToggleReveal.svelte'
import ToggleLink from '#lib/components/recipes/toggle/ToggleLink.svelte'
import ToggleTree from '#lib/components/recipes/toggle/ToggleTree.svelte'
import ToggleSettings from '#lib/components/recipes/toggle/ToggleSettings.svelte'

export {ToggleReveal}
export {ToggleLink}
export {ToggleTree}
export {ToggleSettings}

/**
 * Forms
 */
import SignUpUser from '#lib/forms/SignUpUser.js'
import AppContext from '#lib/forms/AppContext.js'

export {SignUpUser}
export {AppContext}

/**
 * Actors
 */
import Toaster from '#lib/components/blocks/overlays/Toast/actor.svelte.js'
import PopoverActor from '#lib/components/blocks/overlays/Popover/actor.svelte.js'

export {Toaster}
export {PopoverActor}

/**
 * Utilities
 */
import constants from '#lib/types/constants.js'
import * as clickOutside from '#lib/utils/browser/click-outside.js'
import format from '#lib/utils/format.js'
import styles from '#lib/utils/styles.js'
import FormValidator from '#lib/utils/browser/FormValidator.svelte.js'

export {constants}
export {clickOutside}
export {format}
export {styles}
export {FormValidator}

/***************************************************
 * Prepare Exports
 **************************************************/
export const utils = {
	format,
	styles,
	clickOutside,
	FormValidator,
}

export const actors = {
	PopoverActor,
	Toaster,
}

export const forms = {
	AppContext,
	SignUpUser,
}

export const tokens = {
	Color,
	Typography,
}

export const blocks = {
	Button,
	Expand,
	Switch,
	Toggle,
	Feedback,
	Magic,
	Input,
	InputCheck,
	InputRadio,
	InputGroup,
	InputRange,
	InputSidecar,
	InputFile,
}

export const layouts = {
	Burrito,
	Stack,
	Switcher,
	Sidebar,
}

export const recipes = {
	ButtonMenu,
	ToggleMenu,
	SignUp,
	SkipLinks,
	Nav,
}

export const raw = {
	CSSTheme,
	CSSMetro,
	CSSRailway,
	CSSSteam,
	CSSTgv,
	CSSTram,
	CSSVoyager,
	CSSUrbanist,
}

export const content = {
	LayoutGrid,
	LayoutSidebar,
	PageMain,
	PageRails,
	PageContext,
}

export const drafts = {
	Fieldset,
	Popover,
	// InputPassword,
	// InputFeedback,
	Image,
	Picture,
	Scrolly,
	ScrollyItem,
	Breadcrumbs,
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

export const headless = {
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
