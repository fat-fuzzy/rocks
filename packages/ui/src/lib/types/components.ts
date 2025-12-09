import Color from '$lib/components/tokens/Color.svelte'
import Typography from '$lib/components/tokens/Typography.svelte'
import Button from '$lib/components/blocks/buttons/Button.svelte'
import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'
import Switch from '$lib/components/blocks/buttons/Switch/Switch.svelte'
import Toggle from '$lib/components/blocks/buttons/Toggle/Toggle.svelte'
import Feedback from '$lib/components/blocks/global/Feedback.svelte'
import InputCheck from '$lib/components/blocks/inputs/InputCheck.svelte'
import InputRadio from '$lib/components/blocks/inputs/InputRadio.svelte'
import InputRange from '$lib/components/blocks/inputs/InputRange.svelte'
import InputFile from '$lib/components/blocks/inputs/InputFile.svelte'
import Magic from '$lib/components/blocks/global/Magic.svelte'
import Burrito from '$lib/components/layouts/Burrito.svelte'
import RevealLayout from '$lib/components/layouts/reveal/Reveal.svelte'
import Stack from '$lib/components/layouts/Stack.svelte'
import Switcher from '$lib/components/layouts/Switcher.svelte'
import Sidebar from '$lib/components/layouts/Sidebar.svelte'
import ButtonMenu from '$lib/components/recipes/menus/ButtonMenu.svelte'
import ToggleMenu from '$lib/components/recipes/menus/ToggleMenu/ToggleMenu.svelte'
import RevealMenu from '$lib/components/recipes/menus/RevealMenu.svelte'
import SignUp from '$lib/components/recipes/forms/SignUp.svelte'
import Nav from '$lib/components/recipes/navs/Nav.svelte'
import RevealNav from '$lib/components/recipes/navs/RevealNav.svelte'
import CSSMetro from '$lib/components/raw/css-grid-metro.svelte'
import CSSRailway from '$lib/components/raw/css-grid-railway.svelte'
import CSSSteam from '$lib/components/raw/css-grid-steam.svelte'
import CSSTgv from '$lib/components/raw/css-grid-tgv.svelte'
import CSSTram from '$lib/components/raw/css-grid-tram.svelte'
import CSSVoyager from '$lib/components/raw/css-grid-voyager.svelte'
import CSSUrbanist from '$lib/components/raw/css-grid-urbanist.svelte'
import LayoutGrid from '$lib/components/recipes/grid/LayoutGrid.svelte'
import LayoutSidebar from '$lib/components/recipes/content/LayoutSidebar.svelte'
import PageMain from '$lib/components/recipes/content/PageMain.svelte'
import PageRails from '$lib/components/recipes/grid/PageRails.svelte'
import PageContext from '$lib/components/recipes/content/PageContext.svelte'
import Fieldset from '$lib/components/blocks/inputs/Fieldset.svelte'
import Popover from '$lib/components/blocks/overlays/Popover/Popover.svelte'
import InputGroup from '$lib/components/blocks/inputs/InputGroup.svelte'
import Image from '$lib/components/blocks/media/Image.svelte'
import Picture from '$lib/components/blocks/media/Picture.svelte'
import Scrolly from '$lib/components/recipes/animations/scroll/Scrolly.svelte'
import ScrollyItem from '$lib/components/recipes/animations/scroll/ScrollyItem.svelte'
import HeaderNav from '$lib/components/recipes/header/HeaderNav.svelte'
import Cookies from '$lib/components/recipes/forms/Cookies.svelte'
import Breadcrumbs from '$lib/components/recipes/navs/Breadcrumbs.svelte'
import PageNav from '$lib/components/recipes/navs/PageNav.svelte'
import PageHeader from '$lib/components/recipes/content/PageHeader.svelte'
import ExpandLink from '$lib/components/recipes/navs/ExpandLink.svelte'
import Settings from '$lib/components/recipes/forms/Settings.svelte'
import RevealContext from '$lib/components/recipes/forms/RevealContext.svelte'
import Zoomer from '$lib/components/blocks/overlays/Zoomer.svelte'
import Tabs from '$lib/components/recipes/tabs/Tabs.svelte'
import CSSTheme from '$lib/components/raw/css-theme.svelte'
import Toast from '$lib/components/blocks/overlays/Toast/Toast.svelte'
import ToastGroup from '$lib/components/blocks/overlays/Toast/ToastGroup.svelte'
import Head from '$lib/components/blocks/global/Head.svelte'
import EscapeHtml from '$lib/components/blocks/global/EscapeHtml.svelte'

export interface Tokens {
	Color: typeof Color
	Typography: typeof Typography
}

export interface Blocks {
	Button: typeof Button
	Expand: typeof Expand
	Switch: typeof Switch
	Toggle: typeof Toggle
	Feedback: typeof Feedback
	InputCheck: typeof InputCheck
	InputRadio: typeof InputRadio
	InputRange: typeof InputRange
	InputFile: typeof InputFile
	Magic: typeof Magic
}

export interface Layouts {
	Burrito: typeof Burrito
	Reveal: typeof RevealLayout
	Stack: typeof Stack
	Switcher: typeof Switcher
	Sidebar: typeof Sidebar
}

export interface Recipes {
	ButtonMenu: typeof ButtonMenu
	ToggleMenu: typeof ToggleMenu
	RevealMenu: typeof RevealMenu
	SignUp: typeof SignUp
	Nav: typeof Nav
	RevealNav: typeof RevealNav
}

export interface Raw {
	CSSMetro: typeof CSSMetro
	CSSRailway: typeof CSSRailway
	CSSSteam: typeof CSSSteam
	CSSTgv: typeof CSSTgv
	CSSTram: typeof CSSTram
	CSSVoyager: typeof CSSVoyager
	CSSUrbanist: typeof CSSUrbanist
}

export interface Content {
	LayoutGrid: typeof LayoutGrid
	LayoutSidebar: typeof LayoutSidebar
	PageMain: typeof PageMain
	PageRails: typeof PageRails
	PageContext: typeof PageContext
}

export interface Drafts {
	Fieldset: typeof Fieldset
	Popover: typeof Popover
	InputGroup: typeof InputGroup
	Image: typeof Image
	Picture: typeof Picture
	Scrolly: typeof Scrolly
	ScrollyItem: typeof ScrollyItem
	HeaderNav: typeof HeaderNav
	Cookies: typeof Cookies
	Breadcrumbs: typeof Breadcrumbs
	PageNav: typeof PageNav
	PageHeader: typeof PageHeader
	ExpandLink: typeof ExpandLink
	Settings: typeof Settings
	RevealContext: typeof RevealContext
	Zoomer: typeof Zoomer
	Tabs: typeof Tabs
	CSSTheme: typeof CSSTheme
	Toast: typeof Toast
	ToastGroup: typeof ToastGroup
}

export interface Headless {
	Head: typeof Head
	EscapeHtml: typeof EscapeHtml
}

export interface FatFuzzyUi {
	// Components
	blocks: Blocks
	content: Content
	drafts: Drafts
	headless: Headless
	layouts: Layouts
	raw: Raw
	recipes: Recipes
	tokens: Tokens
}
