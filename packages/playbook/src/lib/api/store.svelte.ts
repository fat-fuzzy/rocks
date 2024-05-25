import type {StylesApi} from '$lib/components/styles.api'
import type {StyleTree} from '$lib/api/styles.types'

import constants from '$lib/types/constants'

const {
	DEFAULT_REVEAL_STATE,
	DEFAULT_NAV_REVEAL_STATE,
	DEFAULT_APP_SETTINGS,
	DEFAULT_STYLES,
} = constants

export const styles = $state(DEFAULT_STYLES)

export const reveal = $state(DEFAULT_REVEAL_STATE)

export const app = $state(DEFAULT_APP_SETTINGS)

export const menuReveal = $state(DEFAULT_REVEAL_STATE)

export const navReveal = $state(DEFAULT_REVEAL_STATE)

export const sidebarReveal = $state(DEFAULT_NAV_REVEAL_STATE)

export const settingsReveal = $state(DEFAULT_REVEAL_STATE)

class PlaybookStore {
	api = $state()
	styles = $state(DEFAULT_STYLES)
	reveal = $state(DEFAULT_REVEAL_STATE)
	app = $state(DEFAULT_APP_SETTINGS)
	menuReveal = $state(DEFAULT_REVEAL_STATE)
	navReveal = $state(DEFAULT_REVEAL_STATE)
	sidebarReveal = $state(DEFAULT_NAV_REVEAL_STATE)
	settingsReveal = $state(DEFAULT_REVEAL_STATE)
}

export default PlaybookStore
