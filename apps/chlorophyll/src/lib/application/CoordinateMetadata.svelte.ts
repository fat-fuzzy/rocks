import type {
	Slug,
	TagIndex,
	TagGroup,
	IAggregateDocs,
	ICoordinateMetadata,
	IAggregateMetadata,
} from '$types'

import {buildTagIndex} from '$lib/common/transform/store-to-index'

/**
 * CoordinateMetadata class to manage block and section tags
 * Maintains a cache of data in memory
 * Sends/receive messages via worker bridge
 */
export default class CoordinateMetadata implements ICoordinateMetadata {
	aggMetadata: IAggregateMetadata
	aggDocs: IAggregateDocs
	loading = $state(false)
	error = $state(false)

	constructor(aggMetadata: IAggregateMetadata, aggDocs: IAggregateDocs) {
		this.loading = true
		this.aggMetadata = aggMetadata
		this.aggDocs = aggDocs
	}

	async init() {
		this.loading = false
	}

	reset() {
		this.loading = false
		this.error = false
	}

	getTagGroups(): TagGroup[] {
		return this.aggMetadata.getTagGroups()
	}

	getTagIndex(): TagIndex {
		return buildTagIndex(
			this.aggMetadata.getTagGroups(),
			Object.values(JSON.parse(JSON.stringify(this.aggDocs?.docIndex.blocks))),
		)
	}

	/**
	 * @param options tags to delete
	 */
	async deleteTags(options: {
		groups: {name: Slug; items: string[]}[]
	}): Promise<{id: string} | void> {
		const tagGroups = this.getTagGroups()

		const tagGroupsToKeep: TagGroup[] = []

		for (const tagGroup of tagGroups) {
			if (!options.groups.find((g) => g.name === tagGroup.name)) {
				tagGroupsToKeep.push(tagGroup)
			} else {
				const groupToUpdate = tagGroups.find((tg) => tg.name === tagGroup.name)
				if (!groupToUpdate) {
					throw Error(`No tag group found with name ${tagGroup.name}`)
				} else {
					const tg = await this.aggDocs.untagBlocks({
						group: tagGroup,
						tagIndex: this.getTagIndex(),
						languages: this.aggMetadata.getLanguages(),
						formats: this.aggMetadata.getFormats(),
					})
					if (tg) {
						tagGroupsToKeep.push(tg)
					}
				}
			}
		}

		if (tagGroupsToKeep) {
			await this.aggMetadata.updateTagGroups({
				groups: tagGroupsToKeep,
			})
		}
	}
}
