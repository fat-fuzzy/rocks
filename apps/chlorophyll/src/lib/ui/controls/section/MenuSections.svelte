<script lang="ts">
	import type {UiColor, UiVariant} from '@fat-fuzzy/ui'

	import ui from '@fat-fuzzy/ui'

	import FilterSections from '$lib/ui/controls/section/FilterSections.svelte'

	const {Popover} = ui.drafts

	let {
		id = 'sections',
		color = 'primary',
		variant = 'bare',
		oninput,
	}: {
		id?: string
		color?: UiColor
		variant?: UiVariant
		oninput: () => void
	} = $props()
</script>

<Popover
	id={`toggle-options-${id}`}
	label="Sections"
	asset="chevron-down"
	assetType="svg"
	{color}
	{variant}
	size="2xs"
	font="xs font:heading"
	layer="1"
	layout="flex"
	coords="bottom-left"
>
	<div class="ravioli:xs l:burrito:xs">
		<FilterSections {color} {oninput} />
	</div>
</Popover>
