// Reexport your entry components here
/**
 * Layout components
 */
import Dropdown from './layouts/Dropdown.svelte'
import Sidebar from './layouts/Sidebar.svelte'
import Stack from './layouts/Stack.svelte'
import Burrito from './layouts/Burrito.svelte'

/**
 * Block components
 */
import Button from './blocks/buttons/Button.svelte'
import Canvas from './blocks/media/Canvas.svelte'
import Feedback from './blocks/cards/Feedback.svelte'
import Story from './blocks/forms/Story.svelte'
import Menu from './blocks/navs/Menu.svelte'

/**
 * Stores
 */
import * as gfx from './stores/gfx'
import * as theme from './stores/theme'
import * as ui from './stores/ui'
import * as intl from './stores/intl'

/**
 * Utilities
 */
import * as constants from './types/constants'
import * as clickOutside from './utils/click-outside'

/***************************************************
 * Prepare Exports
 **************************************************/
const utils = {
	clickOutside,
}
const stores = {
	gfx,
	theme,
	ui,
	intl,
}
const layouts = {
	Dropdown,
	Sidebar,
	Stack,
	Burrito,
}
const blocks = {
	Button,
	Canvas,
	Feedback,
	Menu,
	Story,
}
const sass = {
	default: './sass/styles-default.scss',
	doc: './styles/styles-doc.scss',
	client: './styles/styles-client.scss',
}
// [TODO:] Not sure this is useful
async function getSass(theme) {
	const themedStyles = await import(sass[theme])
	return themedStyles
}
export {blocks, layouts, utils, stores, constants, getSass}
