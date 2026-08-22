<script lang="ts">
	import type {UiColor, UiSize} from '@fat-fuzzy/ui'

	import ui from '@fat-fuzzy/ui'

	import dialogActor from '$lib/ui/overlays/dialog/actor.svelte'
	import FormImport from '$lib/ui/controls/data/FormImport.svelte'

	const {Button} = ui.blocks

	interface Props {
		id: string
		label?: string
		color?: UiColor
		size?: UiSize
		font?: UiSize
		onImported?: () => void // hook for parent to refresh state
	}
	let {
		id,
		label = 'Save Backup',
		color = 'primary',
		size = '2xs',
		font = '2xs',
		onImported,
	}: Props = $props()

	function showDialog() {
		dialogActor.init({
			modal: false,
			size: 'sm',
			color,
			label: 'Import Data',
			position: 'nord-est',
			children: presetInfo,
		})

		dialogActor.show()
	}
</script>

{#snippet presetInfo()}
	<FormImport {color} {onImported} />
{/snippet}

<Button
	{id}
	type="button"
	name={id}
	{size}
	{font}
	{color}
	layout="flex"
	justify="end nowrap"
	align="center"
	shape="mellow"
	variant="outline"
	onclick={showDialog}
>
	<span class="font:heading">{label}</span>
	<ff-con class={`svg:arrow-bar-down size:${size} l:flex`}></ff-con>
</Button>
