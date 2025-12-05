import type Color from '$lib/components/tokens/Color.svelte'
import type Typography from '$lib/components/tokens/Typography.svelte'
import type Button from '$lib/components/blocks/buttons/Button.svelte'
import type Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'
import type Switch from '$lib/components/blocks/buttons/Switch/Switch.svelte'
import type Toggle from '$lib/components/blocks/buttons/Toggle/Toggle.svelte'
import type Feedback from '$lib/components/blocks/global/Feedback.svelte'
import type InputCheck from '$lib/components/blocks/inputs/InputCheck.svelte'
import type InputRadio from '$lib/components/blocks/inputs/InputRadio.svelte'
import type InputRange from '$lib/components/blocks/inputs/InputRange.svelte'
import type InputFile from '$lib/components/blocks/inputs/InputFile.svelte'
import type Magic from '$lib/components/blocks/global/Magic.svelte'
import type Burrito from '$lib/components/layouts/Burrito.svelte'
import type RevealLayout from '$lib/components/layouts/reveal/Reveal.svelte'
import type Stack from '$lib/components/layouts/Stack.svelte'
import type Switcher from '$lib/components/layouts/Switcher.svelte'
import type Sidebar from '$lib/components/layouts/Sidebar.svelte'
import type ButtonMenu from '$lib/components/recipes/menus/ButtonMenu.svelte'
import type ToggleMenu from '$lib/components/recipes/menus/ToggleMenu/ToggleMenu.svelte'
import type RevealMenu from '$lib/components/recipes/menus/RevealMenu.svelte'
import type SignUp from '$lib/components/recipes/forms/SignUp.svelte'
import type Nav from '$lib/components/recipes/navs/Nav.svelte'
import type RevealNav from '$lib/components/recipes/navs/RevealNav.svelte'
import type Header from '$lib/components/recipes/header/Header.svelte'
import type CSSMetro from '$lib/components/raw/css-grid-metro.svelte'
import type CSSRailway from '$lib/components/raw/css-grid-railway.svelte'
import type CSSSteam from '$lib/components/raw/css-grid-steam.svelte'
import type CSSTgv from '$lib/components/raw/css-grid-tgv.svelte'
import type CSSTram from '$lib/components/raw/css-grid-tram.svelte'
import type CSSVoyager from '$lib/components/raw/css-grid-voyager.svelte'
import type CSSUrbanist from '$lib/components/raw/css-grid-urbanist.svelte'
import type LayoutGrid from '$lib/components/recipes/grid/LayoutGrid.svelte'
import type LayoutSidebar from '$lib/components/recipes/content/LayoutSidebar.svelte'
import type PageMain from '$lib/components/recipes/content/PageMain.svelte'
import type PageRails from '$lib/components/recipes/grid/PageRails.svelte'
import type PageContext from '$lib/components/recipes/content/PageContext.svelte'
import type Fieldset from '$lib/components/blocks/inputs/Fieldset.svelte'
import type Popover from '$lib/components/blocks/overlays/Popover/Popover.svelte'
import type InputGroup from '$lib/components/blocks/inputs/InputGroup.svelte'
import type Image from '$lib/components/blocks/media/Image.svelte'
import type Picture from '$lib/components/blocks/media/Picture.svelte'
import type Scrolly from '$lib/components/recipes/animations/scroll/Scrolly.svelte'
import type ScrollyItem from '$lib/components/recipes/animations/scroll/ScrollyItem.svelte'
import type HeaderNav from '$lib/components/recipes/header/HeaderNav.svelte'
import type Cookies from '$lib/components/recipes/forms/Cookies.svelte'
import type Breadcrumbs from '$lib/components/recipes/navs/Breadcrumbs.svelte'
import type PageNav from '$lib/components/recipes/navs/PageNav.svelte'
import type PageHeader from '$lib/components/recipes/content/PageHeader.svelte'
import type ExpandLink from '$lib/components/recipes/navs/ExpandLink.svelte'
import type Settings from '$lib/components/recipes/forms/Settings.svelte'
import type RevealContext from '$lib/components/recipes/forms/RevealContext.svelte'
import type Zoomer from '$lib/components/blocks/overlays/Zoomer.svelte'
import type Tabs from '$lib/components/recipes/tabs/Tabs.svelte'
import type CSSTheme from '$lib/components/raw/css-theme.svelte'
import type Toast from '$lib/components/blocks/overlays/Toast/Toast.svelte'
import type ToastGroup from '$lib/components/blocks/overlays/Toast/ToastGroup.svelte'
import type Head from '$lib/components/blocks/global/Head.svelte'
import type EscapeHtml from '$lib/components/blocks/global/EscapeHtml.svelte'

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
	Header: typeof Header
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
