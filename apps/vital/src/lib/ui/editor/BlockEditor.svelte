<script lang="ts">
	import type {
		FileExt,
		Prose,
		Block,
		DocLanguage,
		Slug,
		InputCheckedTypes,
		CurrentCoordinators,
	} from '$types'

	import {getContext} from 'svelte'
	import prose from '@fat-fuzzy/prose'

	import {applyTags} from '$lib/common/tags'
	import DialogDeleteBlock from '$lib/ui/overlays/dialog/DialogDeleteBlock.svelte'
	import SelectTags from '$lib/ui/controls/tags/SelectTags.svelte'
	import type {UiColor, UiShape, UiSize} from '@fat-fuzzy/ui'

	const {Editor} = prose.editor

	const coordinators: CurrentCoordinators = getContext('currentCoordinators')

	let coordDocs = $derived(coordinators.docs)
	let coordMetadata = $derived(coordinators.metadata)

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
		color,
	}: {
		sectionName: string
		language: DocLanguage
		format: Slug
		color?: UiColor
		tagsFound?: string[]
	} & Block = $props()

	let editorId = $derived(`editor-${name}`)

	let displayBlock = $state(false)
	let isSkillSet = $derived(tags.find((t) => t === 'skills'))
	let isChlorophyll = $derived(coordDocs.getRoot() === 'chlorophyll')
	let isMainContentBlock = $derived(content_type === 'section')
	let height = $derived(
		isChlorophyll && isSkillSet
			? ('xs' as UiSize)
			: isChlorophyll
				? ('sm' as UiSize)
				: 'xl',
	)

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
				options: {id: `tags-${id}`, label: 'Tags', shape: 'mellow' as UiShape},
				menu: blockTags,
			},
			{
				options: {
					id: `delete-block-${id}`,
					label: 'Delete',
					shape: 'mellow' as UiShape,
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

		coordDocs.saveBlock(updated)
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
			tagGroups: coordMetadata.getTagGroups(),
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

		coordDocs.saveBlock(updated)
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
		{color}
		size="sm"
		oninput={updateTags}
		value={block.tags}
		tagGroups={coordMetadata.getTagGroups().filter((tg) => {
			if (block.content_type === 'section') {
				return tg.type !== 'radio'
			}
			return tg
		})}
	/>
{/snippet}

{#snippet deleteBlock()}
	<DialogDeleteBlock
		id={`dialog-delete-block-${id}`}
		{block}
		{sectionName}
		{coordDocs}
		{coordMetadata}
	/>
{/snippet}

{#if tags.length === 0 || displayBlock}
	{#key editorId}
		<Editor
			id={editorId}
			type="html"
			{content}
			color="neutral"
			{height}
			width="2xl"
			onblur={handleBlur}
			{menus}
		/>
	{/key}
{/if}
