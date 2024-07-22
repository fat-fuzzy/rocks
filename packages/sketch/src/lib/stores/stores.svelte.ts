import {constants} from '@fat-fuzzy/ui'

const {DEFAULT_APP_SETTINGS} = constants

class SketchStore {
	app = $state({settings: DEFAULT_APP_SETTINGS})
	constructor() {}
	// TODO: init and update functions
}

const store = new SketchStore()
export default store
