import type {
	Slug,
	TagIndex,
	TagGroup,
	IAggregateDocs,
	ICoordinateMetadata,
	IAggregateMetadata,
	DocLanguage,
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
	tagIndex: TagIndex
	loading = $state(false)
	error = $state(false)

	constructor(aggMetadata: IAggregateMetadata, aggDocs: IAggregateDocs) {
		this.loading = true
		this.aggMetadata = aggMetadata
		this.aggDocs = aggDocs
		this.tagIndex = this.getTagIndex()
	}

	async init() {
		this.loading = false
	}

	reset() {
		this.loading = false
		this.error = false
	}

	getLanguages(): DocLanguage[] {
		return this.aggMetadata.base.languages
	}

	checkLanguageExists(languageName: string): boolean {
		return this.aggMetadata.base.languages.includes(languageName)
	}

	async addLanguage(options: {name: DocLanguage; sourceLanguage: DocLanguage}) {
		this.aggMetadata.addLanguage(options)
	}

	getFormats(): Slug[] {
		return this.aggMetadata.base.formats
	}

	checkFormatExists(formatName: string): boolean {
		return this.aggMetadata.base.formats.includes(formatName)
	}

	async addFormat(options: {name: Slug; sourceFormat: Slug}) {
		this.aggMetadata.addFormat(options)
	}

	getTagGroups(): TagGroup[] {
		return JSON.parse(JSON.stringify(this.aggMetadata.tagGroups))
	}

	getTagIndex(): TagIndex {
		return buildTagIndex(
			this.getTagGroups(),
			Object.values(JSON.parse(JSON.stringify(this.aggDocs?.docIndex.blocks))),
		)
	}

	async createTag(options: {
		name: Slug
		group: {name: Slug; title: string; type?: string}
	}): Promise<{id: string} | void> {
		return this.aggMetadata.createTag(options)
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
						languages: this.getLanguages(),
						formats: this.getFormats(),
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
