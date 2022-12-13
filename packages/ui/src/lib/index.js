// Reexport your entry components here
/**
 * Layout components
 */
import Reveal from './layouts/Reveal.svelte'
import Sidebar from './layouts/Sidebar.svelte'
import Stack from './layouts/Stack.svelte'
import Burrito from './layouts/Burrito.svelte'

/**
 * Block components
 */
import Button from './blocks/buttons/Button.svelte'
import ButtonMenu from './blocks/buttons/ButtonMenu.svelte'
// import Canvas from './blocks/media/Canvas.svelte'
import Upload from './blocks/forms/Upload.svelte'
import Feedback from './blocks/cards/Feedback.svelte'
import Nav from './blocks/navs/Nav.svelte'
import SubNav from './blocks/navs/SubNav.svelte'
// import Sketch from './blocks/graphics/Sketch.svelte'

/**
 * Story components
 */
import Story from './stories/Story.svelte'
import StoryActions from './stories/StoryActions.svelte'

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
	Burrito,
	Reveal,
	Sidebar,
	Stack,
}
const blocks = {
	Button,
	ButtonMenu,
	// Canvas, TODO: init canvas with example Sketch
	Upload,
	Nav,
	SubNav,
	// Sketch,
	Feedback,
}
const stories = {
	Story,
	StoryActions,
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
export {blocks, layouts, stories, utils, stores, constants, getSass}
