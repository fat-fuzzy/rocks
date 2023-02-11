
import {api} from '@fat-fuzzy/ui'

export class UiState {
	app: string;
	shared: string;
	blocks: string;
	layouts: string;

	/**
	 * Create a UI state object from the user's cookie, or initialize a new UI state
	 */
	constructor(serialized: string | undefined = undefined) {
		if (serialized) {
			const {app, shared, blocks, layouts} = JSON.parse(serialized)
			this.app = app;
			this.shared = shared
			this.blocks = blocks
			this.layouts = layouts
		} else {
			this.app = api.uiOptions.DEFAULT_OPTIONS['app']
			this.shared = api.uiOptions.DEFAULT_OPTIONS['shared']
			this.blocks = api.uiOptions.DEFAULT_OPTIONS['blocks']
			this.layouts = api.uiOptions.DEFAULT_OPTIONS['layouts']
		}
	}

	/**
	 * Update UI library state based on inputs
	 */
	enter(values) {
		console.log('ui-state/enter - ApiValues');
		console.log(values);
		
		return true;
	}

	/**
	 * Serialize game state so it can be set as a cookie
	 */
	toString() {
		return JSON.stringify({app:this.app, shared: this.shared, blocks: this.blocks, layouts : this.layouts});
	}
}
