import type {
	Slug,
	Block,
	TagIndex,
	TagGroup,
	FileExt,
	IAggregateDocs,
	IAggregateTags,
	IAggregateMetadata,
} from '$types'

import {SvelteMap} from 'svelte/reactivity'

import WorkerBridge from '$lib/workers/worker-bridge'
import {getBridge} from '$lib/aggregates/bridge'

import {getTagKey} from '$lib/common/format'
import {buildTagIndex} from '$lib/common/transform/store-to-index'

/**
 * AggregateTags class to manage block and section tags
 * Maintains a cache of data in memory
 * Sends/receive messages via worker bridge
 */
export default class AggregateTags implements IAggregateTags {
	bridge: WorkerBridge | undefined = $state()
	aggMetadata: IAggregateMetadata | undefined = $state()
	aggDocs: IAggregateDocs | undefined = $state()
	loading = $state(false)
	error = $state(false)
	tagGroups: TagGroup[] = $derived(
		this.aggMetadata ? this.aggMetadata.getTagGroups() : [],
	)
	tagIndex: TagIndex = $derived(
		this.aggDocs
			? buildTagIndex(
					this.tagGroups,
					Object.values(this.aggDocs?.docIndex.blocks),
				)
			: {
					tags: {},
					taggedBlocks: {},
				},
	)

	constructor(aggMetadata: IAggregateMetadata, aggDocs: IAggregateDocs) {
		this.loading = true
		this.aggMetadata = aggMetadata
		this.aggDocs = aggDocs
	}

	async init() {
		this.bridge = getBridge()
		this.loading = false
	}

	reset() {
		this.tagGroups = []
	}

	/**
	 * @param options tag data
	 */
	async createTag(options: {
		name: Slug
		group: {name: Slug; title: string; type?: string}
	}): Promise<{id: string} | void> {
		if (!this.bridge || !this.aggMetadata) {
			return
		}

		const group = this.aggMetadata.getTagGroupByName(options.group.name)

		if (!group) {
			this.aggMetadata.base.tags.push({
				...options.group,
				items: [options.name],
			})
		} else {
			if (group.items.some((i) => i === options.name)) {
				throw Error(
					`A tag named ${options.name} already exists in group ${options.group.title}`,
				)
			} else {
				group.items.push(options.name)
			}
		}

		await this.bridge.saveBase({
			base: JSON.parse(JSON.stringify(this.aggMetadata.base)),
		})
	}

	/**
	 * @param options tags to delete
	 */
	async deleteTags(options: {
		groups: {name: Slug; items: string[]}[]
	}): Promise<{id: string} | void> {
		if (!this.bridge || !this.aggMetadata || !this.aggDocs) {
			return
		}

		const tagGroupsToKeep = this.tagGroups.filter((tg) => {
			return !options.groups.some((g) => g.name === tg.name)
		})

		const blocksToUpdate = new SvelteMap<string, Block>()

		for (const group of options.groups) {
			const groupToUpdate = this.tagGroups.find((tg) => tg.name === group.name)

			if (!groupToUpdate) {
				throw Error(`No tag group found with name ${group.name}`)
			} else {
				const tagsToKeep = []

				for (const tag of groupToUpdate.items) {
					if (!group.items.includes(tag)) {
						tagsToKeep.push(tag)
					}
				}

				for (const tag of group.items) {
					const tagKey = getTagKey(group.name, tag)

					// 1. Gather blocks to update
					const taggedBlocks = this.tagIndex.taggedBlocks[tagKey]

					if (taggedBlocks) {
						for (const block of taggedBlocks) {
							let toUpdate = blocksToUpdate.get(block.id)

							if (!toUpdate) {
								toUpdate = block
							}

							toUpdate.tags = toUpdate.tags.filter((t) => t !== tag)

							blocksToUpdate.set(toUpdate.id, toUpdate)
						}
					}
				}

				const {languages, formats} = this.aggMetadata.base

				for (const language of languages) {
					for (const format of formats) {
						// 2. Update blocks
						for (const block of blocksToUpdate.values()) {
							const section = this.aggDocs.getSectionById(block.parentId)

							await this.aggDocs.saveBlock({
								language,
								format,
								block,
								path: {
									filename: block.name,
									filetype: 'json' as FileExt,
									parent: section.name,
								},
							})
						}

						// 3. Update sections (TODO: create tagged sections index)
						const doc = this.aggDocs.content[language]?.[format]

						if (!doc) {
							continue
						}

						for (const section of doc.sections) {
							if (section.tags) {
								section.tags = section.tags.filter(
									(t) => !group.items.includes(t),
								)
								await this.bridge.saveSection({
									language,
									format,
									// FIXME: shouldn't have to do this
									section: JSON.parse(JSON.stringify(section)),
								})
							} else if (section.subsections) {
								const defaultGroup = section.subsections.find(
									(sub) => sub.name === section.name,
								)

								if (defaultGroup) {
									for (const block of defaultGroup.blocks) {
										block.tags = block.tags.filter(
											(t) => !group.items.includes(t),
										)
									}

									await this.bridge.saveSection({
										language,
										format,
										// FIXME: shouldn't have to do this
										section: JSON.parse(JSON.stringify(section)),
									})
								}
							}
						}
					}
				}

				// 4. Update tag groups
				if (tagsToKeep.length > 0) {
					groupToUpdate.items = tagsToKeep
					tagGroupsToKeep.push(groupToUpdate)
				}
			}
		}

		this.aggMetadata.base.tags = tagGroupsToKeep

		await this.bridge.saveBase({
			base: JSON.parse(JSON.stringify(this.aggMetadata.base)),
		})
	}
}
