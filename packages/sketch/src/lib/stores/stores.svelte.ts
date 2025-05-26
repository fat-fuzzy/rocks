import ui from '@fat-fuzzy/ui'

const {DEFAULT_PREFERENCES} = ui.constants

class SketchStore {
	app = $state(DEFAULT_PREFERENCES)
	constructor() {}
	// TODO: init and update functions
}

const store = new SketchStore()
export default store
