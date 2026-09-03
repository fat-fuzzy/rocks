<script lang="ts">
	import type {UiColor, UiSize, UiVariant} from '@fat-fuzzy/ui'

	import ui from '@fat-fuzzy/ui'

	import DialogData from '$lib/ui/controls/data/DialogData.svelte'
	import Export from '$lib/ui/controls/data/Export.svelte'

	const {Popover} = ui.drafts

	let {
		id = 'data',
		color = 'primary',
		variant = 'outline',
		size = '2xs',
		font = 'sm',
	}: {
		id?: string
		color?: UiColor
		variant?: UiVariant
		size?: UiSize
		font?: UiSize
	} = $props()
</script>

<Popover
	id={`toggle-options-${id}`}
	label="Data"
	asset="chevron-down"
	assetType="svg"
	{color}
	{variant}
	{size}
	{font}
	layer="1"
	layout="flex"
	coords="bottom-right"
>
	<menu class="l:stack:3xs ravioli:xs align:start">
		<DialogData id="button-import" label="Source" {color} {size} {font} />
		<Export
			id="button-export"
			label="Export"
			filename="cv-content"
			{color}
			{size}
			{font}
		/>
	</menu>
</Popover>
