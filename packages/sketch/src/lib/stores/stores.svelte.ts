import {constants} from '@fat-fuzzy/ui-s5'

const {DEFAULT_APP_SETTINGS} = constants

class SketchStore {
	app = $state(DEFAULT_APP_SETTINGS)

	constructor() {}
	// TODO: init and update functions
}

const store = new SketchStore()
export default store
