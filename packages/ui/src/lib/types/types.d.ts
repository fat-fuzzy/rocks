// types.d.ts
import type {SvelteComponent} from 'svelte'

export interface Utils {
	format: typeof import('$lib/utils/format.js').default
	clickOutside: typeof import('$lib/utils/click-outside.js')
}

export interface Forms {
	NavReveal: typeof import('$lib/forms/nav-reveal.js').default
	SidebarReveal: typeof import('$lib/forms/settings-reveal.js').default
	SettingsReveal: typeof import('$lib/forms/settings-update.js').default
	SettingsUpdate: typeof import('$lib/forms/sidebar-reveal.js').default
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
	Fieldset: typeof import('$lib/components/blocks/forms/Fieldset.svelte').default
	InputCheck: typeof import('$lib/components/blocks/forms/InputCheck.svelte').default
	InputRadio: typeof import('$lib/components/blocks/forms/InputRadio.svelte').default
	InputRange: typeof import('$lib/components/blocks/forms/InputRange.svelte').default
	InputFile: typeof import('$lib/components/blocks/forms/InputFile.svelte').default
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
	InputGroup: typeof import('$lib/components/recipes/forms/InputGroup.svelte').default
	LogIn: typeof import('$lib/components/recipes/forms/LogIn.svelte').default
	Nav: typeof import('$lib/components/recipes/navs/Nav.svelte').default
	RevealNav: typeof import('$lib/components/recipes/navs/RevealNav.svelte').default
	Header: typeof import('$lib/components/recipes/headers/Header.svelte').default
}

export interface Content {
	PageMain: typeof import('$lib/components/recipes/content/PageMain.svelte').default
	LayoutSidebar: typeof import('$lib/components/recipes/content/LayoutSidebar.svelte').default
}

export interface Headless {
	Head: typeof import('$lib/components/blocks/global/Head.svelte').default
}

export interface FatFuzzyUi {
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
