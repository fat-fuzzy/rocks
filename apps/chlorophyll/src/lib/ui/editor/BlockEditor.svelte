<script lang="ts">
	import type {FileExt, Prose, Block, DocLanguage, DocFormat} from '$types'

	import {getContext} from 'svelte'
	import prose from '@fat-fuzzy/prose'

	import StorageService from '$lib/common/services/storage.svelte'
	import DialogDeleteBlock from '$lib/ui/controls/block/DialogDeleteBlock.svelte'
	import SelectTags from '$lib/ui/controls/tags/SelectTags.svelte'

	const {Editor} = prose.editor

	let storageService: StorageService = getContext('storageService')

	let {
		id,
		content_type,
		parentId,
		name,
		rank,
		group,
		sectionName,
		tags,
		content,
		tagsFound,
		language,
		format,
	}: {
		sectionName: string
		language: DocLanguage
		format: DocFormat
		tagsFound?: string[]
	} & Block = $props()

	let editorId = $derived(`editor-${name}`)

	let displayBlock = $state(false)
	let isSkillSet = $derived(tags.find((t) => t === 'skills'))
	let isMainContentBlock = $derived(content_type === 'section')

	let block: Block = $derived({
		id,
		rank,
		parentId,
		content_type,
		group,
		name,
		content: {
			html: content.html, // FIXME: sanitize
			json: {},
		},
		tags: [...tags],
	})

	let menus = $derived.by(() => {
		const _menus = [
			{options: {id: `tags-${id}`, label: 'Tags'}, menu: blockTags},
			{
				options: {id: `delete-block-${id}`, label: 'Delete'},
				menu: deleteBlock,
			},
		]

		return _menus
	})

	function handleBlur(content: Prose) {
		block.content = content

		let updated = {
			language,
			format,
			path: {
				filename: name,
				filetype: 'json' as FileExt,
				parent: isMainContentBlock ? undefined : sectionName,
			},
			block,
		}

		storageService.saveBlock(updated)
	}

	function updateTags(event: Event) {
		const target = event.target as HTMLInputElement
		const value = String(target.value)
		const type = String(target.type)

		if (value) {
			const groupSelectAll = value.indexOf('all-save-')

			if (type === 'radio') {
				block.tags = block.tags.filter((t) => !group?.includes(t))
				block.tags.push(value)
			} else {
				if (groupSelectAll === -1) {
					if (!block.tags.includes(value)) {
						block.tags.push(value)
					} else {
						block.tags = block.tags.filter((t) => t !== value)
					}
				} else {
					// TODO: clean this up
					const group = String(value).substring(`'all-save-${id}`.length)

					const groupItems = storageService.tags.find(
						(g) => g.name === group,
					)?.items

					if (!groupItems || groupItems.length === 0) {
						return
					} else {
						const tagsInBlock = []

						for (const tag of groupItems) {
							if (block.tags.includes(tag)) {
								tagsInBlock.push(tag)
							}
						}

						// Retain all tags not in this group (doing this to avoid duplicates later)
						// TODO: use Set
						block.tags = block.tags.filter((t) => !groupItems.includes(t))

						// If Block contains all tags already, selectAll will remove them all
						if (tagsInBlock.length === groupItems.length) {
							// Do nothing
						} else {
							// Else it will add them all
							block.tags = [...block.tags, ...groupItems]
						}
					}
				}
			}

			if (block.tags.length === 0) {
				block.tags = ['untagged']
			} else if (block.tags.length > 1 && block.tags.includes('untagged')) {
				block.tags = block.tags.filter((t) => t !== 'untagged')
			}

			let updated = {
				language,
				format,
				path: {
					filename: name,
					filetype: 'json' as FileExt,
					parent: isMainContentBlock ? undefined : sectionName,
				},
				block,
			}

			storageService.saveBlock(updated)
		}
	}

	$effect(() => {
		if (tagsFound?.length) {
			displayBlock = tagsFound.length ? true : false
		} else {
			displayBlock = true
		}
	})
</script>

{#snippet blockTags()}
	<SelectTags
		cta="save"
		{id}
		size="sm"
		oninput={updateTags}
		value={block.tags}
		tagGroups={storageService.tags}
	/>
{/snippet}

{#snippet deleteBlock()}
	<DialogDeleteBlock id={`dialog-delete-block-${id}`} {block} {sectionName} />
{/snippet}

{#if tags.length === 0 || displayBlock}
	{#key editorId}
		<Editor
			id={editorId}
			type="html"
			{content}
			color="neutral"
			height={isSkillSet ? 'xs' : 'sm'}
			width="2xl"
			onblur={handleBlur}
			{menus}
		/>
	{/key}
{/if}
