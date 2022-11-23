// Reexport your entry components here
import Button from './blocks/button/Button.svelte'
import Canvas from './blocks/canvas/Canvas.svelte'
import Feedback from './blocks/feedback/Feedback.svelte'
import Menu from './blocks/menu/Menu.svelte'
import * as constants from './types/constants'
import * as clickOutside from './utils/click-outside'
import * as gfx from './stores/gfx'
import * as theme from './stores/theme'
import * as ui from './stores/ui'
import * as intl from './stores/intl'
const utils = {
	clickOutside,
}
const stores = {
	gfx,
	theme,
	ui,
	intl,
}
const styles = {
	default: './styles/styles-default.scss',
	doc: './styles/styles-doc.scss',
	client: './styles/styles-client.scss',
}
async function getStyles(theme) {
	const themedStyles = await import(styles[theme])
	return themedStyles
}
export {Button, Canvas, Feedback, Menu, utils, stores, constants, getStyles}
