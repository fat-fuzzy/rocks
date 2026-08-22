import type {Prose, ICoordinateExports, IAggregateDataLifecycle} from '$types'

export default class CoordinateExports implements ICoordinateExports {
	aggDataLifecycle: IAggregateDataLifecycle
	loading = $state(false)
	error = $state(false)
	export = $state({
		type: 'doc-root',
		meta: {},
		data: '',
	})

	constructor(aggDataLifecycle: IAggregateDataLifecycle) {
		this.loading = true
		this.aggDataLifecycle = aggDataLifecycle
	}

	async buildFullJSON(): Promise<string> {
		let result = ''

		try {
			this.loading = true
			result = await this.aggDataLifecycle.buildFullJSON()
		} catch {
			this.error = true
		} finally {
			this.loading = false
		}

		return result
	}

	buildFullMarkdown(options: {
		root: string
		content: {[id: string]: Prose}
		presets: {id: string; query: string}[]
	}): string {
		let result = ''

		try {
			this.loading = true
			result = this.aggDataLifecycle.buildFullMarkdown(options)
		} catch {
			this.error = true
		} finally {
			this.loading = false
		}

		return result
	}
}
