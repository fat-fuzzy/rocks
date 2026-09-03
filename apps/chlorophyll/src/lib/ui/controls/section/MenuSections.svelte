<script lang="ts">
	import type {UiColor, UiSize, UiVariant} from '@fat-fuzzy/ui'

	import ui from '@fat-fuzzy/ui'

	import FilterSections from '$lib/ui/controls/section/FilterSections.svelte'

	const {Popover} = ui.drafts

	let {
		id = 'sections',
		color = 'primary',
		variant = 'bare',
		oninput,
		size = '2xs',
		font = 'sm',
	}: {
		id?: string
		color?: UiColor
		variant?: UiVariant
		oninput: () => void
		size?: UiSize
		font?: UiSize
	} = $props()
</script>

<Popover
	id={`toggle-options-${id}`}
	label="Sections"
	asset="chevron-down"
	assetType="svg"
	{color}
	{variant}
	{size}
	{font}
	layer="1"
	layout="flex"
	coords="bottom-left"
>
	<div class="ravioli:xs l:burrito:xs">
		<FilterSections {color} {oninput} />
	</div>
</Popover>
