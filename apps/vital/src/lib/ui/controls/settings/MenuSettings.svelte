<script lang="ts">
	import type {UiColor, UiSize, UiVariant} from '@fat-fuzzy/ui'
	import type {CurrentCoordinators} from '$types'

	import {getContext} from 'svelte'
	import ui from '@fat-fuzzy/ui'

	import Settings from '$lib/ui/controls/settings/Settings.svelte'

	const coordinators: CurrentCoordinators = getContext('currentCoordinators')

	let coordMetadata = $derived(coordinators.metadata)

	const {Popover} = ui.drafts
	let {
		id = 'settings',
		color = 'neutral',
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
	label="Settings"
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
	<div class="l:flex align:between nowrap ravioli:xs">
		<Settings {oninput} {color} {coordMetadata} />
	</div>
</Popover>
