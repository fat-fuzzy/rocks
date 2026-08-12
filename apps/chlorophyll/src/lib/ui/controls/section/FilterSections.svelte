<script lang="ts">
	import type {UiColor} from '@fat-fuzzy/ui'
	import type {DocFormat, FrontmatterStructure, IDocService} from '$types'

	import {getContext} from 'svelte'
	import ui from '@fat-fuzzy/ui'

	import {page} from '$app/state'
	import {PUBLIC_DOC_FORMAT} from '$app/env/public'

	const {InputGroup} = ui.blocks

	const {color, oninput}: {color?: UiColor; oninput: (e: Event) => void} =
		$props()

	let docService: IDocService = getContext('docService')

	let format = $derived(
		(page.url.searchParams.get('format') || PUBLIC_DOC_FORMAT) as DocFormat,
	)

	let structure = $derived(
		docService.structures.find(
			(s: FrontmatterStructure) => s.format === format,
		),
	)

	let sections = $derived(structure?.sections || [])
	let selected = $derived(page.url.searchParams.getAll('sections'))

	let sectionItems = $derived(
		sections.map((section: string) => {
			let selected = checkSelected('sections', section)
			return {
				id: section,
				name: section,
				value: section,
				checked: selected ? true : undefined,
				label: section,
			}
		}),
	)

	function checkSelected(group: string, value: string) {
		const allValues = page.url.searchParams.getAll(group)
		return allValues.includes(value)
	}
</script>

{#if sectionItems.length}
	<InputGroup
		id="sections"
		name="sections"
		legend="Main Sections"
		type="checkbox"
		layout="switcher"
		value={selected}
		size="2xs"
		{color}
		variant="bare"
		items={sectionItems}
		{oninput}
	/>
{:else}
	<div>
		<div class="ravioli:xs font:sm shape:mellow surface:1:neutral">
			<p class="font:heading font:semibold text:center">No sections found</p>
		</div>
	</div>
{/if}
