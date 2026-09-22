<script lang="ts">
	import type {UiColor, UiSize, UiVariant} from '@fat-fuzzy/ui'

	import ui from '@fat-fuzzy/ui'

	import DialogData from '$lib/ui/overlays/dialog/DialogData.svelte'
	import Export from '$lib/ui/controls/data/Export.svelte'
	import type {ICoordinateImports} from '$types'

	const {Popover} = ui.drafts

	let {
		id = 'data',
		color = 'neutral',
		variant = 'outline',
		size = '2xs',
		font = 'sm',
		coordImports,
	}: {
		id?: string
		color?: UiColor
		variant?: UiVariant
		size?: UiSize
		font?: UiSize
		coordImports: ICoordinateImports
	} = $props()
</script>

<Popover
	id={`toggle-options-${id}`}
	label="Data"
	asset="chevron-right"
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
		<Export
			id="button-export"
			label="Export"
			filename="cv-content"
			{color}
			{size}
			{font}
		/>
		<DialogData
			id="button-import"
			label="Source"
			{color}
			{size}
			{font}
			{coordImports}
		/>
	</menu>
</Popover>
