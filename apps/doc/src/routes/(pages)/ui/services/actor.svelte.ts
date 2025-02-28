import playbook from '@fat-fuzzy/playbook'

const {PlaybookActor, StylesApi} = playbook

class PageActor {
	playbookActor = $state()
	playbookContext = $state()

	constructor() {
		this.playbookActor = new PlaybookActor()
		this.playbookContext = new StylesApi()
	}

	getActor(): PlaybookActor {
		return this.playbookActor
	}

	getContext(): StylesApi {
		return this.playbookContext
	}
}
const actor = new PageActor()
export default actor
