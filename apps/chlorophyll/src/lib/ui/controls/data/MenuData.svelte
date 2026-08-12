<script lang="ts">
	import type {UiColor, UiVariant} from '@fat-fuzzy/ui'

	import ui from '@fat-fuzzy/ui'

	import DialogImport from '$lib/ui/controls/data/DialogImport.svelte'
	import Export from '$lib/ui/controls/data/Export.svelte'
	import DialogReset from '$lib/ui/controls/data/DialogReset.svelte'

	const {Popover} = ui.drafts

	let {
		id = 'data',
		color = 'primary',
		variant = 'bare',
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
		<DialogImport id="button-import" label="Import" {color} />
		<Export id="button-export" label="Export" filename="cv-content" {color} />
		<DialogReset id="button-reset" label="Reset" {color} />
	</menu>
</Popover>
