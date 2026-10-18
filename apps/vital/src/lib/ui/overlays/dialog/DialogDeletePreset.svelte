<script lang="ts">
	import type {ICoordinatePresets, Preset} from '#types'
	import type {UiColor, UiShape, UiSize, UiVariant} from '@fat-fuzzy/ui'

	import {SvelteURL} from 'svelte/reactivity'
	import {page} from '$app/state'
	import {Button} from '@fat-fuzzy/ui'

	import {NAMESPACE_TO_PRESET_LABEL} from '#lib/intl/l10n.js'
	import dialogActor from '#lib/ui/overlays/dialog/actor.svelte.js'
	import {getSanitizedParamValue} from '#lib/common/url.js'

	import FormPreset from '#lib/ui/controls/preset/FormPreset.svelte'

	interface Props {
		id: string
		preset: Preset
		label?: string
		size: UiSize
		color?: UiColor
		variant?: UiVariant
		shape?: UiShape
		disabled?: boolean
		coordPresets: ICoordinatePresets
	}
	let {
		id,
		preset,
		label = 'Delete',
		size = '2xs',
		color = 'highlight',
		variant = 'bare',
		shape = 'round',
		disabled,
		coordPresets,
	}: Props = $props()

	function showDialog() {
		dialogActor.init({
			modal: false,
			size: 'sm',
			color,
			label: `${label} ${NAMESPACE_TO_PRESET_LABEL[coordPresets.getRoot()]}`,
			position: 'nord-est',
			children: presetForm,
		})

		dialogActor.show()
	}

	function handleSubmit() {
		const url = new SvelteURL(page.url.href)
		const currentPreset = getSanitizedParamValue(url.searchParams, 'preset')
		const presetName = preset.name

		setTimeout(() => {
			dialogActor.close()

			if (currentPreset === presetName) {
				url.searchParams.delete('preset')

				window.location.href = url.href
			}
		}, 50)
	}
</script>

{#snippet presetForm()}
	<FormPreset
		cta="delete"
		{preset}
		{color}
		{coordPresets}
		onsubmit={handleSubmit}
	/>
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
