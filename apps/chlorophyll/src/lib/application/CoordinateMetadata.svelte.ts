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
import {getTagKey} from '$lib/common/format'

/**
 * CoordinateMetadata class to manage block and section tags
 * Maintains a cache of data in memory
 * Sends/receive messages via worker bridge
 */
export default class CoordinateMetadata implements ICoordinateMetadata {
	aggMetadata: IAggregateMetadata
	aggDocs: IAggregateDocs
	tagIndex: TagIndex = $derived(this.getTagIndex())
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
	async untagDocs(options: {
		groups: {name: Slug; items: string[]}[]
	}): Promise<TagGroup[]> {
		const {groups} = options

		const tagGroups = this.getTagGroups()
		const languages = this.getLanguages()
		const formats = this.getFormats()

		const tagGroupsToKeep: TagGroup[] = []

		for (const tagGroup of tagGroups) {
			const toUpdate = groups.find((g) => g.name === tagGroup.name)

			if (!toUpdate) {
				tagGroupsToKeep.push(tagGroup)
			} else {
				for (const tag of toUpdate.items) {
					const tagKey = getTagKey(toUpdate.name, tag)

					// 1. Gather blocks to update
					const taggedBlocks = this.tagIndex.taggedBlocks[tagKey]

					if (taggedBlocks) {
						for (const language of languages) {
							for (const format of formats) {
								await this.aggDocs.untagBlocks({
									blocks: taggedBlocks,
									toUpdate: toUpdate,
									language,
									format,
								})
							}
						}
					}

					const tagsToKeep: Slug[] = tagGroup.items.filter((t) => t !== tag)

					if (tagsToKeep.length > 0) {
						tagGroup.items = tagsToKeep
						tagGroupsToKeep.push(tagGroup)
					}
				}
			}
		}

		return tagGroupsToKeep
	}

	/**
	 * @param options tags to delete
	 */
	async setTagGroups(options: {tagGroups: TagGroup[]}): Promise<void> {
		const {tagGroups} = options

		await this.aggMetadata.updateTagGroups({
			groups: tagGroups,
		})

		this.tagIndex = this.getTagIndex()
	}
}
