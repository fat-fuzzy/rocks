import {error} from '@sveltejs/kit'
import gfx from '@fat-fuzzy/gfx'
import uiActions from '$lib/forms/actions/ui-actions'
import settingsActions from '$lib/forms/actions/settings-actions'

export const load = ({params}) => {
	let sketchData = gfx.gl.sketches.projects.find((s) => {
		return s.meta.slug === params.slug
	})

	if (!sketchData) {
		throw error(404, {message: 'Sketch not found'})
	}
	let meta = sketchData.meta

	if (!meta) {
		throw error(500, {message: 'Sketch data not found'})
	}

	return meta
}

export const actions = {
	toggleNav: async (event) => uiActions.handleToggleNav(event),
	toggleSidebar: async (event) => uiActions.handleToggleSidebar(event),
	toggleSettings: async (event) => uiActions.handleToggleSettings(event),
	toggleLearning: async (event) => uiActions.handleToggleLearning(event),
	toggleProjects: async (event) => uiActions.handleToggleProjects(event),
	updateSettings: async (event) =>
		settingsActions.handleUpdateAppSettings({event}),
}
