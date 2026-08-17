<script lang="ts">
	import type {UiColor, UiVariant} from '@fat-fuzzy/ui'

	import ui from '@fat-fuzzy/ui'

	import Settings from '$lib/ui/controls/settings/Settings.svelte'

	const {Popover} = ui.drafts
	let {
		id = 'settings',
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
	label="Settings"
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
	<div class="l:flex align:between nowrap ravioli:xs">
		<Settings {oninput} {color} />
	</div>
</Popover>
