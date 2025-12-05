/**
 * Forms
 */
import UiReveal from '$lib/forms/ui-reveal.js'
import SignUpUser from '$lib/forms/ui-sample-signup.js'
import AppContext from '$lib/forms/app-context.svelte.js'

/**
 * Actors
 */
import Toaster from '$lib/components/blocks/overlays/Toast/actor.svelte.js'
import PopoverActor from '$lib/components/blocks/overlays/Popover/actor.svelte.js'

import constants from '$lib/types/constants.js'
import * as clickOutside from '$lib/utils/click-outside.js'
import format from '$lib/utils/format.js'

export interface Utils {
	format: typeof format
	clickOutside: typeof clickOutside
}

export interface Forms {
	UiReveal: typeof UiReveal
	AppContext: typeof AppContext
	SignUpUser: typeof SignUpUser
}

export interface Actors {
	Toaster: typeof Toaster
	PopoverActor: typeof PopoverActor
}

export interface FatFuzzyTools {
	actors: Actors
	forms: Forms
	constants: typeof constants
	utils: Utils
}
