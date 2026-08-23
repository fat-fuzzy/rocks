<script lang="ts">
	import type {UiColor, UiSize, UiVariant} from '@fat-fuzzy/ui'
	import type {ICoordinateExports} from '$types'

	import ui from '@fat-fuzzy/ui'
	import {getContext} from 'svelte'

	import {generateDownload} from '$lib/common/download'

	let coordExports: ICoordinateExports = getContext('coordExports')

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
		size = 'xs',
		font = 'xs',
	}: Props = $props()

	async function handleExport() {
		const data = await coordExports.exportData({
			filetype: 'json',
		})
		generateDownload({filename, data, mimeType})
	}
</script>

<Button
	{id}
	type="button"
	name={id}
	{label}
	{size}
	{font}
	{color}
	{variant}
	shape="mellow"
	onclick={handleExport}
	layout="flex"
	justify="between nowrap"
	align="center"
>
	<span class="font:heading">{label}</span>
	<ff-con class={`svg:arrow-bar-up size:${size} l:flex`}></ff-con>
</Button>
