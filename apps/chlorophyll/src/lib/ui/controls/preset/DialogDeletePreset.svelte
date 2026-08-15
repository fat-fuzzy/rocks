<script lang="ts">
	import type {Preset} from '$types'
	import type {UiColor, UiShape, UiSize, UiVariant} from '@fat-fuzzy/ui'

	import ui from '@fat-fuzzy/ui'

	import dialogActor from '$lib/ui/overlays/dialog/actor.svelte'

	import FormPreset from '$lib/ui/controls/preset/FormPreset.svelte'

	const {Button} = ui.blocks

	interface Props {
		id: string
		preset: Preset
		label?: string
		size: UiSize
		color?: UiColor
		variant?: UiVariant
		shape?: UiShape
		disabled?: boolean
	}
	let {
		id,
		preset,
		label = 'Delete preset',
		size = '2xs',
		color = 'highlight',
		variant = 'bare',
		shape = 'round',
		disabled,
	}: Props = $props()

	function showDialog() {
		dialogActor.init({
			modal: false,
			size: 'sm',
			color,
			label: 'Delete Preset',
			position: 'nord-est',
			children: presetForm,
		})

		dialogActor.show()
	}
</script>

{#snippet presetForm()}
	<FormPreset cta="delete" {preset} {color} />
{/snippet}

<!-- FIXME: add tooltip -->
<Button
	{id}
	{label}
	type="button"
	name={id}
	{size}
	{color}
	{shape}
	{variant}
	asset="cross"
	assetType="svg"
	onclick={showDialog}
	{disabled}
/>
