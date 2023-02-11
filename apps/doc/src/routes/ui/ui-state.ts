
// TODO : harmonize / merge / refactor this with ui/api/options.ts
interface ApiValues {
	[styleFamily: string]: {
		[style: string]: string
	}
}

export class UiState {
	app: string;
	shared: string;
	blocks: string;
	layouts: string;

	/**
	 * Create a game object from the player's cookie, or initialise a new game
	 */
	constructor(serialized: string | undefined = undefined) {
		if (serialized) {
			const [app, shared, blocks, layouts] = serialized.split('-');

			this.app = app;
			this.shared = shared
			this.blocks = blocks
			this.layouts = layouts
		} else {
		
			this.app = '';
			this.shared = ''
			this.blocks = ''
			this.layouts = ''
		}
	}

	/**
	 * Update game state based on a guess of a five-letter word. Returns
	 * true if the guess was valid, false otherwise
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
		return `${this.app}-${this.shared}-${this.blocks}-${this.layouts}`;
	}
}
