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
import * as styles from './styles/styles.scss' // TODO: figure out a way to export one stylesheet only (import theme styles)
import * as stylesDoc from './styles/styles-doc.scss' // TODO: figure out a way to export one stylesheet only (import theme styles)

const utils = {
	clickOutside,
}
const stores = {
	gfx,
	theme,
	ui,
	intl,
}
export {Button, Canvas, Feedback, Menu, utils, stores, constants, styles, stylesDoc}
