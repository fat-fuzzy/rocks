import type {Tab} from '$types'
import constants from '$lib/types/constants'

const {UI_DOC_TABS} = constants

export class DsTabUpdate {
	currentTab: Tab

	/**
	 * Initialize default Tab object or from the user's cookie values, if any
	 */
	constructor(currentTab: Tab | null = null) {
		if (currentTab) {
			this.currentTab = currentTab
		} else {
			this.currentTab = UI_DOC_TABS[0]
		}
	}

	/**
	 * Update Tab based on inputs
	 */
	update(data: FormData) {
		if (data.has('toggle')) {
			const updated = data.get('toggle')?.toString()
			const updatedValue = UI_DOC_TABS.find((tab) => tab.value === updated)
			if (updatedValue) {
				this.currentTab = updatedValue
				return true
			}
		}
		return false
	}

	/**
	 * Serialize Tab so it can be set as a cookie
	 */
	toString() {
		return JSON.stringify(this.currentTab)
	}
}
