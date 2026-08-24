<script lang="ts">
	import type {UiColor} from '@fat-fuzzy/ui'
	import type {Slug, DocLanguage, ICoordinateDocs} from '$types'

	import {getContext} from 'svelte'
	import ui from '@fat-fuzzy/ui'

	import {page} from '$app/state'
	import {DOC_LANGUAGE, DOC_FORMAT} from '$config/setup'

	const {InputGroup} = ui.blocks

	const {color, oninput}: {color?: UiColor; oninput: (e: Event) => void} =
		$props()

	let coordDocs: ICoordinateDocs = getContext('coordDocs')

	let format = $derived(
		(page.url.searchParams.get('format') || DOC_FORMAT) as Slug,
	)

	let language = $derived(
		(page.url.searchParams.get('language') || DOC_LANGUAGE) as DocLanguage,
	)

	let sections = $derived(
		coordDocs.getSections({format, language}).map((s) => s.name),
	)
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
