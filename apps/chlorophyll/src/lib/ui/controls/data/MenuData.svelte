<script lang="ts">
	import type {UiColor, UiVariant} from '@fat-fuzzy/ui'

	import ui from '@fat-fuzzy/ui'

	import DialogData from '$lib/ui/controls/data/DialogData.svelte'
	import Export from '$lib/ui/controls/data/Export.svelte'

	const {Popover} = ui.drafts

	let {
		id = 'data',
		color = 'primary',
		variant = 'outline',
	}: {
		id?: string
		color?: UiColor
		variant?: UiVariant
	} = $props()
</script>

<Popover
	id={`toggle-options-${id}`}
	label="Data"
	asset="chevron-down"
	assetType="svg"
	{color}
	{variant}
	size="2xs"
	font="xs font:heading"
	layer="1"
	layout="flex"
	coords="bottom-right"
>
	<menu class="l:stack:3xs ravioli:xs align:start">
		<DialogData id="button-import" label="Source" {color} />
		<Export id="button-export" label="Export" filename="cv-content" {color} />
	</menu>
</Popover>
