<script lang="ts">
	import type {UiColor} from '@fat-fuzzy/ui'
	import type {TagGroup, InputGroupMenus} from '$types'

	import {getContext} from 'svelte'
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	import DocumentService from '$lib/services/storage/document-service.svelte'
	import DialogSaveTag from '$lib/ui/controls/tags/DialogSaveTag.svelte'
	import DialogDeleteTags from '$lib/ui/controls/tags/DialogDeleteTags.svelte'
	import Loading from '$lib/ui/Loading.svelte'

	const {InputGroup, Feedback} = ui.blocks

	const {oninput}: {oninput: (e: Event) => void} = $props()

	let documentService: DocumentService = getContext('documentService')

	let cta = $derived(page.params.page)
	let base = $derived(documentService.base)
	let loading = $derived(documentService.loading)
	let error = $derived(documentService.error)

	let tags = $derived.by(() => {
		const menuItems = base.tags.reduce(
			(
				menus: InputGroupMenus,
				{title, name, type, items}: TagGroup,
			): InputGroupMenus => {
				const menuItems = items.map((i: string) => {
					let selected = checkSelected(name, i)
					return {
						id: i,
						name,
						value: i,
						checked: selected ? true : undefined,
						label: i,
						color: (type ? 'accent' : 'primary') as UiColor,
						title: title ?? name,
					}
				})

				// @ts-expect-error FIXME: create validator
				menus[name] = menuItems
				return menus
			},
			{},
		)

		return menuItems
	})

	function checkSelected(group: string, value: string) {
		const allValues = page.url.searchParams.getAll(group)
		return allValues.includes(value)
	}
</script>

<div class="l:stack:3xs raviolink">
	<div class="w:full l:flex:2xs align:center justify:between">
		<h3 class="ravioli:3xs">Tags</h3>
		{#if cta === 'edit'}
			<menu class="l:switcher:2xs nowrap">
				<DialogDeleteTags
					id="dialog-delete-tags"
					color="highlight"
					label="Delete Tags"
					cta="delete"
					groups={documentService.tags}
				/>
				<DialogSaveTag
					id="dialog-create-tags"
					color="primary"
					label="Add Tag"
					cta="save"
					asset="plus"
					assetType="svg"
					groups={documentService.tags}
				/>
			</menu>
		{/if}
	</div>
	{#if loading}
		<Loading color="neutral" />
	{:else if error}
		<Feedback status="error" context="prose" variant="bare" asset="default">
			<p>Failed to load Tags.</p>
		</Feedback>
	{:else if base.tags.length === 0}
		<div class="scroll:container font:sm shape:mellow surface:1:neutral">
			<p class="font:heading font:semibold text:center">No tags found</p>
		</div>
	{:else}
		<div class="l:flex:2xs align:start justify:between">
			{#each base.tags as group, i (i)}
				<InputGroup
					id={group.name}
					name={group.name}
					legend={group.title}
					type={group.type ?? 'checkbox'}
					value={page.url.searchParams.getAll(group.name)}
					size="2xs"
					color={group.type ? 'accent' : 'primary'}
					variant={group.name === 'twilight-z' || group.name === 'version'
						? 'outline'
						: 'bare'}
					selectAll={true}
					items={tags[group.name]}
					{oninput}
				/>
			{/each}
		</div>
	{/if}
</div>
