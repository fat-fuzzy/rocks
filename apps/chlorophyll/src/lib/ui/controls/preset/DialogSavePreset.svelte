<script lang="ts">
	import type {Preset} from '$types'
	import type {
		UiAssetType,
		UiColor,
		UiShape,
		UiSize,
		UiVariant,
	} from '@fat-fuzzy/ui'

	import ui from '@fat-fuzzy/ui'

	import dialogActor from '$lib/ui/overlays/dialog/actor.svelte'
	import FormPreset from '$lib/ui/controls/preset/FormPreset.svelte'

	const {Button} = ui.blocks

	interface Props {
		id: string
		preset: Preset
		cta: 'save' | 'update' | 'copy'
		disabled?: boolean
		label?: string
		size?: UiSize
		color?: UiColor
		variant?: UiVariant
		shape?: UiShape
		asset?: string
		assetType?: UiAssetType
	}
	let {
		id,
		cta,
		preset,
		disabled,
		label = 'Save Preset',
		size = '2xs',
		color = 'primary',
		variant = 'outline',
		shape = 'mellow',
		asset,
		assetType,
	}: Props = $props()

	function showDialog() {
		dialogActor.init({
			size: 'sm',
			color,
			label,
			position: 'nord-est',
			children: presetInfo,
		})

		dialogActor.show()
	}
</script>

{#snippet presetInfo()}
	<FormPreset {preset} {color} {cta} />
{/snippet}

<!-- FIXME: add tooltip -->
<Button
	{id}
	type="button"
	name={id}
	{size}
	font="2xs font:heading"
	{label}
	{color}
	{shape}
	{variant}
	{asset}
	{assetType}
	disabled={disabled || !preset.query}
	onclick={showDialog}
/>
