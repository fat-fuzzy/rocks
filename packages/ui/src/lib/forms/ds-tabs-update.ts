import type {Tab} from '$types'
import constants from '$lib/types/constants'

const {UI_DOC_TABS} = constants

export class DsTabsUpdate {
	currentTabs: {[key: string]: Tab}

	/**
	 * Initialize default Tab object or from the user's cookie values, if any
	 */
	constructor(currentTabs: {[key: string]: Tab} | null = null) {
		if (currentTabs) {
			this.currentTabs = currentTabs
		} else {
			this.currentTabs = {element: UI_DOC_TABS[0], category: UI_DOC_TABS[0]}
		}
	}

	/**
	 * Update Tab based on inputs
	 */
	updateElementTab(data: FormData) {
		if (data.has('toggle')) {
			const updated = data.get('toggle')?.toString()
			const updatedValue = UI_DOC_TABS.find((tab) => tab.value === updated)
			if (updatedValue) {
				this.currentTabs.element = updatedValue
				return true
			}
		}
		return false
	}

	/**
	 * Update Tab based on inputs
	 */
	updateCategoryTab(data: FormData) {
		if (data.has('toggle')) {
			const updated = data.get('toggle')?.toString()
			const updatedValue = UI_DOC_TABS.find((tab) => tab.value === updated)
			if (updatedValue) {
				this.currentTabs.category = updatedValue
				return true
			}
		}
		return false
	}

	/**
	 * Serialize Tab so it can be set as a cookie
	 */
	toString() {
		return JSON.stringify(this.currentTabs)
	}
}
