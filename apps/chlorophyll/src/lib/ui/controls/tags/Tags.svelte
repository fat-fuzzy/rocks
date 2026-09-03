<script lang="ts">
	import type {UiColor} from '@fat-fuzzy/ui'
	import type {
		TagGroup,
		InputGroupMenus,
		ActionDoc,
		ActionResource,
		ActionTransform,
	} from '$types'

	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	import DialogSaveTag from '$lib/ui/controls/tags/DialogSaveTag.svelte'
	import DialogDeleteTags from '$lib/ui/controls/tags/DialogDeleteTags.svelte'
	import Loading from '$lib/ui/Loading.svelte'

	const {InputGroup, Feedback} = ui.blocks

	const {
		cta,
		loading,
		error,
		tags,
		oninput,
	}: {
		cta: ActionDoc | ActionResource | ActionTransform
		loading: boolean
		error: boolean
		tags: TagGroup[]
		oninput: (e: Event) => void
	} = $props()

	let baseTags = $derived.by(() => {
		const menuItems = tags.reduce(
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

<div class="ui-controls l:stack:3xs raviolink">
	<div class="w:full l:flex:2xs align:center justify:between">
		<h3 class="ravioli:3xs">Tags</h3>
		{#if cta != 'compare' && cta !== 'print'}
			<menu class="l:switcher:sm nowrap">
				<DialogDeleteTags
					id="dialog-delete-tags"
					color="highlight"
					label="Delete Tags"
					cta="delete"
					asset="cross"
					assetType="svg"
					groups={tags}
				/>
				<DialogSaveTag
					id="dialog-create-tags"
					color="primary"
					label="Add Tag"
					cta="save"
					asset="plus"
					assetType="svg"
					groups={tags}
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
	{:else if tags.length === 0}
		<div class="scroll:container font:sm shape:mellow surface:1:neutral">
			<p class="font:heading font:semibold text:center">No tags found</p>
		</div>
	{:else}
		<div class="tags-menu l:flex:2xs align:start justify:between">
			{#each tags as group, i (i)}
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
					items={baseTags[group.name]}
					{oninput}
				/>
			{/each}
			{#if tags.length < 2}
				<div
					class="ravioli:xs font:sm shape:mellow surface:1:neutral maki:block:xs"
				>
					<p class="font:heading font:semibold text:center">
						No custom tags found
					</p>
				</div>
			{/if}
		</div>
	{/if}
</div>
