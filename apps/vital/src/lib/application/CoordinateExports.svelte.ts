import type {ICoordinateExports, IAggregateDataLifecycle, FileExt} from '$types'

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

	async exportData(options: {filetype: FileExt}): Promise<string> {
		const {filetype} = options

		let result = ''

		try {
			this.loading = true

			switch (filetype) {
				case 'json':
					result = await this.aggDataLifecycle.buildJsonForExport()
					break
				case 'md':
					result = await this.aggDataLifecycle.buildMarkdownForExport()
					break
				default:
					result = ''
			}
		} catch {
			this.error = true
		} finally {
			this.loading = false
		}

		return result
	}
}
