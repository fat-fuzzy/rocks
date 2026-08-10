<script lang="ts">
	import type {
		FileExt,
		Prose,
		Block,
		DocLanguage,
		DocFormat,
		InputCheckedTypes,
		IDocumentService,
	} from '$types'

	import {getContext} from 'svelte'
	import prose from '@fat-fuzzy/prose'

	import {applyTags} from '$lib/common/tags'
	import TagService from '$lib/services/storage/TagService.svelte'
	import DialogDeleteBlock from '$lib/ui/controls/block/DialogDeleteBlock.svelte'
	import SelectTags from '$lib/ui/controls/tags/SelectTags.svelte'

	const {Editor} = prose.editor

	let documentService: IDocumentService = getContext('documentService')
	let tagService: TagService = getContext('tagService')

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
		tags,
	})

	let menus = $derived.by(() => {
		const _menus = [
			{
				options: {id: `tags-${id}`, label: 'Tags'},
				menu: blockTags,
			},
			{
				options: {
					id: `delete-block-${id}`,
					label: 'Delete',
				},
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

		documentService.saveBlock(updated)
	}

	function updateTags(event: Event) {
		const target = event.target as HTMLInputElement
		const value = String(target.value)

		// The actual tag name to update
		if (!value) {
			return
		}

		const type = String(target.type) as InputCheckedTypes

		const updatedTags = applyTags({
			cta: 'save',
			value,
			name: String(target.name),
			type,
			id,
			currentTags: block.tags,
			tagGroups: tagService.tags,
		})

		block.tags = updatedTags

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

		documentService.saveBlock(updated)
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
		tagGroups={tagService.tags}
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
