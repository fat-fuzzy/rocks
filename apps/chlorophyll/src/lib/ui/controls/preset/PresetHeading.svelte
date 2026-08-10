<script lang="ts">
	import type {ActionDoc, Preset, IPresetService} from '$types'

	import {getContext} from 'svelte'
	import ui from '@fat-fuzzy/ui'

	const {Button} = ui.blocks

	const {
		cta,
		preset,
		query,
	}: {
		cta: ActionDoc
		preset: Preset
		query: string
	} = $props()

	let presetService: IPresetService = getContext('presetService')

	function savePreset(preset: Preset) {
		presetService.savePreset({
			path: {
				filename: preset.name,
				filetype: 'json',
			},
			meta: {
				id: preset.id,
				name: preset.name,
				label: preset.name,
				content_type: 'preset',
			},
			preset: {
				...preset,
				query,
			},
		})
	}
</script>

<div class="l:flex">
	{#if cta === 'edit' || cta === 'build'}
		<Button
			label="Save Preset"
			type="button"
			id="preset-dialog-submit"
			name=""
			asset={query === preset.query || preset.locked ? 'check' : 'save'}
			assetType="svg"
			shape="mellow"
			color="primary"
			align="center"
			variant={query === preset.query || preset.locked ? 'fill' : 'outline'}
			size="xs"
			font="2xs font:heading"
			disabled={preset.locked || !preset.query}
			onclick={() => savePreset(preset)}
		/>
	{/if}

	<h2 class="font:semibold">
		Current preset:
		{preset.name}
		{preset.locked ? '(Locked)' : ''}
	</h2>
</div>
