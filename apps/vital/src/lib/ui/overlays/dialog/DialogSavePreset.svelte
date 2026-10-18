<script lang="ts">
	import type {ICoordinatePresets, Preset} from '#types'
	import type {
		UiAssetType,
		UiColor,
		UiShape,
		UiSize,
		UiVariant,
	} from '@fat-fuzzy/ui'

	import {Button} from '@fat-fuzzy/ui'

	import dialogActor from '#lib/ui/overlays/dialog/actor.svelte.js'
	import FormPreset from '#lib/ui/controls/preset/FormPreset.svelte'

	interface Props {
		id: string
		preset: Preset
		cta: 'save' | 'update' | 'copy'
		disabled?: boolean
		label?: string
		size?: UiSize
		font?: UiSize
		color?: UiColor
		variant?: UiVariant
		shape?: UiShape
		asset?: string
		assetType?: UiAssetType
		coordPresets: ICoordinatePresets
	}
	let {
		id = 'save-preset',
		cta,
		preset,
		disabled,
		label = 'Save Preset',
		size = '2xs',
		font = '2xs',
		color = 'neutral',
		variant = 'outline',
		shape = 'mellow',
		asset,
		assetType,
		coordPresets,
	}: Props = $props()

	function showDialog() {
		dialogActor.init({
			size: 'sm',
			color,
			label,
			position: 'nord-est',
			children: presetForm,
		})

		dialogActor.show()
	}

	function handleSubmit() {
		setTimeout(() => {
			dialogActor.close()
		}, 50)
	}
</script>

{#snippet presetForm()}
	<FormPreset {preset} {color} {cta} {coordPresets} onsubmit={handleSubmit} />
{/snippet}

<!-- FIXME: add tooltip -->
<Button
	{id}
	type="button"
	name={id}
	{size}
	{font}
	{label}
	{color}
	{shape}
	{variant}
	{asset}
	{assetType}
	disabled={disabled || !preset.query}
	onclick={showDialog}
/>
