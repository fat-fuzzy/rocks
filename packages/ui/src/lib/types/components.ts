export interface Utils {
	format: typeof import('$lib/utils/format.js').default
	clickOutside: typeof import('$lib/utils/click-outside.js')
}

export interface Forms {
	UiReveal: typeof import('$lib/forms/ui-reveal.js').default
	AppContext: typeof import('$lib/forms/app-context.svelte.js').default
	SignUpUser: typeof import('$lib/forms/ui-sample-signup.js').default
}

export interface Actors {
	Toaster: typeof import('$lib/components/blocks/overlays/Toast/actor.svelte.js').default
	PopoverActor: typeof import('$lib/components/blocks/overlays/Popover/actor.svelte.js').default
}

export interface Tokens {
	Color: typeof import('$lib/components/tokens/Color.svelte').default
	Typography: typeof import('$lib/components/tokens/Typography.svelte').default
}

export interface Blocks {
	Button: typeof import('$lib/components/blocks/buttons/Button.svelte').default
	Expand: typeof import('$lib/components/blocks/buttons/Expand/Expand.svelte').default
	Switch: typeof import('$lib/components/blocks/buttons/Switch/Switch.svelte').default
	Toggle: typeof import('$lib/components/blocks/buttons/Toggle/Toggle.svelte').default
	Feedback: typeof import('$lib/components/blocks/global/Feedback.svelte').default
	InputCheck: typeof import('$lib/components/blocks/inputs/InputCheck.svelte').default
	InputRadio: typeof import('$lib/components/blocks/inputs/InputRadio.svelte').default
	InputRange: typeof import('$lib/components/blocks/inputs/InputRange.svelte').default
	InputFile: typeof import('$lib/components/blocks/inputs/InputFile.svelte').default
	Magic: typeof import('$lib/components/blocks/global/Magic.svelte').default
}

export interface Layouts {
	Burrito: typeof import('$lib/components/layouts/Burrito.svelte').default
	Reveal: typeof import('$lib/components/layouts/reveal/Reveal.svelte').default
	Stack: typeof import('$lib/components/layouts/Stack.svelte').default
	Switcher: typeof import('$lib/components/layouts/Switcher.svelte').default
	Sidebar: typeof import('$lib/components/layouts/Sidebar.svelte').default
}

export interface Recipes {
	ButtonMenu: typeof import('$lib/components/recipes/menus/ButtonMenu.svelte').default
	ToggleMenu: typeof import('$lib/components/recipes/menus/ToggleMenu/ToggleMenu.svelte').default
	RevealMenu: typeof import('$lib/components/recipes/menus/RevealMenu.svelte').default
	SignUp: typeof import('$lib/components/recipes/forms/SignUp.svelte').default
	Nav: typeof import('$lib/components/recipes/navs/Nav.svelte').default
	RevealNav: typeof import('$lib/components/recipes/navs/RevealNav.svelte').default
}

export interface Raw {
	CSSMetro: typeof import('$lib/components/raw/css-grid-metro.svelte').default
	CSSRailway: typeof import('$lib/components/raw/css-grid-railway.svelte').default
	CSSSteam: typeof import('$lib/components/raw/css-grid-steam.svelte').default
	CSSTgv: typeof import('$lib/components/raw/css-grid-tgv.svelte').default
	CSSTram: typeof import('$lib/components/raw/css-grid-tram.svelte').default
	CSSVoyager: typeof import('$lib/components/raw/css-grid-voyager.svelte').default
	CSSUrbanist: typeof import('$lib/components/raw/css-grid-urbanist.svelte').default
}

export interface Content {
	LayoutGrid: typeof import('$lib/components/recipes/grid/LayoutGrid.svelte').default
	LayoutSidebar: typeof import('$lib/components/recipes/content/LayoutSidebar.svelte').default
	PageMain: typeof import('$lib/components/recipes/content/PageMain.svelte').default
	PageRails: typeof import('$lib/components/recipes/grid/PageRails.svelte').default
	PageContext: typeof import('$lib/components/recipes/content/PageContext.svelte').default
}

export interface Drafts {
	Fieldset: typeof import('$lib/components/blocks/inputs/Fieldset.svelte').default
	Popover: typeof import('$lib/components/blocks/overlays/Popover/Popover.svelte').default
	InputGroup: typeof import('$lib/components/blocks/inputs/InputGroup.svelte').default
	Image: typeof import('$lib/components/blocks/media/Image.svelte').default
	Picture: typeof import('$lib/components/blocks/media/Picture.svelte').default
	Scrolly: typeof import('$lib/components/recipes/animations/scroll/Scrolly.svelte').default
	ScrollyItem: typeof import('$lib/components/recipes/animations/scroll/ScrollyItem.svelte').default
	HeaderNav: typeof import('$lib/components/recipes/header/HeaderNav.svelte').default
	Cookies: typeof import('$lib/components/recipes/forms/Cookies.svelte').default
	Breadcrumbs: typeof import('$lib/components/recipes/navs/Breadcrumbs.svelte').default
	PageNav: typeof import('$lib/components/recipes/navs/PageNav.svelte').default
	PageHeader: typeof import('$lib/components/recipes/content/PageHeader.svelte').default
	ExpandLink: typeof import('$lib/components/recipes/navs/ExpandLink.svelte').default
	Settings: typeof import('$lib/components/recipes/forms/Settings.svelte').default
	RevealContext: typeof import('$lib/components/recipes/forms/RevealContext.svelte').default
	Zoomer: typeof import('$lib/components/blocks/overlays/Zoomer.svelte').default
	Tabs: typeof import('$lib/components/recipes/tabs/Tabs.svelte').default
	CSSTheme: typeof import('$lib/components/raw/css-theme.svelte').default
	Toast: typeof import('$lib/components/blocks/overlays/Toast/Toast.svelte').default
	ToastGroup: typeof import('$lib/components/blocks/overlays/Toast/ToastGroup.svelte').default
}

export interface Headless {
	Head: typeof import('$lib/components/blocks/global/Head.svelte').default
	EscapeHtml: typeof import('$lib/components/blocks/global/EscapeHtml.svelte').default
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
	// Tools
	actors: Actors
	forms: Forms
	constants: typeof import('$lib/types/constants.js').default
	utils: Utils
}
