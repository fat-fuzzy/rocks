<script lang="ts">
	import type {UiColor, UiSize, UiVariant} from '@fat-fuzzy/ui'

	import ui from '@fat-fuzzy/ui'
	import {getContext} from 'svelte'

	import ExportService from '$lib/common/services/export'
	import {generateDownload} from '$lib/utils/download'

	let exportService: ExportService = getContext('exportService')

	const {Button} = ui.blocks

	interface Props {
		id: string
		filename: string
		mimeType?: string
		label?: string
		color?: UiColor
		variant?: UiVariant
		size?: UiSize
		font?: UiSize
	}

	let {
		id,
		filename,
		mimeType = 'application/json',
		label = 'Export',
		color = 'primary',
		variant = 'outline',
		size = '2xs',
		font = '2xs',
	}: Props = $props()

	async function handleExport() {
		const data = await exportService.buildFullJSON()
		generateDownload({filename, data, mimeType})
	}
</script>

<Button
	{id}
	type="button"
	name={id}
	{size}
	{font}
	{color}
	{variant}
	shape="mellow"
	onclick={handleExport}
	layout="flex"
	justify="end nowrap"
	align="center"
>
	<span class="font:heading">{label}</span>
	<ff-con class={`svg:arrow-bar-up size:${size} l:flex`}></ff-con>
</Button>
