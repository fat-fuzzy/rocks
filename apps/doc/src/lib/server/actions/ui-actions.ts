import type {RequestEvent} from '@sveltejs/kit'
import type {UiActionSetInput, UiActionSetOutput} from '$lib/types/actions.js'
import {error} from '@sveltejs/kit'
import ui from '@fat-fuzzy/ui'

import uiStateService from '$lib/server/services/session.js'

const {
	APP_PREFIX,
	DEFAULT_REVEAL_STATE,
	DEFAULT_NAV_REVEAL_STATE,
	DEFAULT_SIDEBAR_REVEAL_STATE,
} = ui.constants
const {UiReveal} = ui.forms

async function handleToggleUiReveal({
	event,
	element,
	options,
}: UiActionSetInput): Promise<UiActionSetOutput> {
	const {request, cookies} = event

	const data = await request.formData()

	if (!element) {
		error(500, `Cannot toggle ${element} element`)
	}

	const key = `${APP_PREFIX}-reveal-${element}`
	const currentState = uiStateService.getUiState({
		cookies,
		key,
	})

	if (!currentState.reveal) {
		currentState.reveal = options?.state?.reveal
	}

	try {
		const reveal = new UiReveal(currentState, element)
		const newState = reveal.reveal(data)

		if (!newState.success) {
			error(500, `Failed to toggle ${key}`)
		}

		uiStateService.setUiState({
			cookies,
			key,
			value: newState.state,
			options: {
				path: '/',
			},
		})
		return {
			success: true,
			key,
			state: newState.state,
		}
	} catch (error) {
		return {
			success: false,
			type: element,
			message: 'Failed to update UI', // TODO: improve / manage error message with intl package,
		}
	}
}

async function handleToggleSidebar(event: RequestEvent) {
	const element = 'sidebar'
	return handleToggleUiReveal({
		event,
		element,
		options: {
			state: DEFAULT_SIDEBAR_REVEAL_STATE,
		},
	})
}

async function handleToggleAppContext(event: RequestEvent) {
	const element = 'appContext'
	return handleToggleUiReveal({
		event,
		element,
		options: {
			state: DEFAULT_REVEAL_STATE,
		},
	})
}

async function handleToggleNav(event: RequestEvent) {
	const element = 'nav'
	return handleToggleUiReveal({
		event,
		element,
		options: {
			state: DEFAULT_NAV_REVEAL_STATE,
		},
	})
}

async function handleToggleTokens(event: RequestEvent) {
	const element = 'tokens'
	return handleToggleUiReveal({
		event,
		element,
		options: {
			state: DEFAULT_REVEAL_STATE,
		},
	})
}

async function handleToggleBlocks(event: RequestEvent) {
	const element = 'blocks'
	return handleToggleUiReveal({
		event,
		element,
		options: {
			state: DEFAULT_REVEAL_STATE,
		},
	})
}

async function handleToggleLayouts(event: RequestEvent) {
	const element = 'layouts'
	return handleToggleUiReveal({
		event,
		element,
		options: {
			state: DEFAULT_REVEAL_STATE,
		},
	})
}

async function handleToggleRecipes(event: RequestEvent) {
	const element = 'recipes'
	return handleToggleUiReveal({
		event,
		element,
		options: {
			state: DEFAULT_REVEAL_STATE,
		},
	})
}

async function handleToggleRaw(event: RequestEvent) {
	const element = 'raw'
	return handleToggleUiReveal({
		event,
		element,
		options: {
			state: DEFAULT_REVEAL_STATE,
		},
	})
}

async function handleTogglePageContext(event: RequestEvent) {
	const element = 'pageContext'
	return handleToggleUiReveal({
		event,
		element,
		options: {
			state: DEFAULT_REVEAL_STATE,
		},
	})
}

async function handleToggleUsage(event: RequestEvent) {
	const element = 'usage'
	return handleToggleUiReveal({
		event,
		element,
		options: {
			state: DEFAULT_REVEAL_STATE,
		},
	})
}

async function handleToggleDecisions(event: RequestEvent) {
	const element = 'decisions'
	return handleToggleUiReveal({
		event,
		element,
		options: {
			state: DEFAULT_REVEAL_STATE,
		},
	})
}

async function handleToggleSpeaking(event: RequestEvent) {
	const element = 'speaking'
	return handleToggleUiReveal({
		event,
		element,
		options: {
			state: DEFAULT_REVEAL_STATE,
		},
	})
}

async function handleToggleLearning(event: RequestEvent) {
	const element = 'learning'
	return handleToggleUiReveal({
		event,
		element,
		options: {
			state: DEFAULT_REVEAL_STATE,
		},
	})
}

async function handleToggleProjects(event: RequestEvent) {
	const element = 'projects'
	return handleToggleUiReveal({
		event,
		element,
		options: {
			state: DEFAULT_REVEAL_STATE,
		},
	})
}

export default {
	handleToggleSidebar,
	handleToggleNav,
	handleToggleAppContext,
	handleToggleTokens,
	handleToggleBlocks,
	handleToggleLayouts,
	handleToggleRecipes,
	handleToggleRaw,
	handleTogglePageContext,
	handleToggleUsage,
	handleToggleDecisions,
	handleToggleSpeaking,
	handleToggleLearning,
	handleToggleProjects,
}
