export interface Utils {
	format: typeof import('$lib/utils/format.js').default
	clickOutside: typeof import('$lib/utils/click-outside.js')
}

export interface Forms {
	UiReveal: typeof import('$lib/forms/ui-reveal.js').default
	SettingsUpdate: typeof import('$lib/forms/settings-update.js').default
	SignUpUser: typeof import('$lib/forms/ui-sample-signup.js').default
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
	Reveal: typeof import('$lib/components/layouts/Reveal.svelte').default
	RevealAuto: typeof import('$lib/components/layouts/RevealAuto.svelte').default
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
	Header: typeof import('$lib/components/recipes/header/Header.svelte').default
}

export interface Content {
	PageMain: typeof import('$lib/components/recipes/content/PageMain.svelte').default
	LayoutSidebar: typeof import('$lib/components/recipes/content/LayoutSidebar.svelte').default
}

export interface Drafts {
	Fieldset: typeof import('$lib/components/blocks/inputs/Fieldset.svelte').default
	InputGroup: typeof import('$lib/components/blocks/inputs/InputGroup.svelte').default
	Picture: typeof import('$lib/components/blocks/media/Picture.svelte').default
	Aside: typeof import('$lib/components/recipes/content/Aside.svelte').default
	Scrolly: typeof import('$lib/components/recipes/animations/Scrolly.svelte').default
	ScrollyItem: typeof import('$lib/components/recipes/animations/ScrollyItem.svelte').default
	HeaderSettings: typeof import('$lib/components/recipes/header/HeaderSettings.svelte').default
}

export interface Headless {
	Head: typeof import('$lib/components/blocks/global/Head.svelte').default
	EscapeHtml: typeof import('$lib/components/blocks/global/EscapeHtml.svelte').default
}

export interface FatFuzzyUi {
	drafts: Drafts
	headless: Headless
	tokens: Tokens
	blocks: Blocks
	layouts: Layouts
	recipes: Recipes
	content: Content
	utils: Utils
	forms: Forms
	constants: typeof import('$lib/types/constants.js').default
}
