<script lang="ts">
	import type {Preset, Slug, ICoordinatePresets} from '$types'

	import {getContext} from 'svelte'
	import ui from '@fat-fuzzy/ui'
	import DialogSaveSection from '$lib/ui/controls/section/DialogSaveSection.svelte'

	const {Button} = ui.blocks

	const {
		cta,
		preset,
		query,
		formats,
	}: {
		cta: string
		preset: string | null
		query: string
		formats: Slug[]
	} = $props()

	let coordPresets: ICoordinatePresets = getContext('coordPresets')

	let currentPreset = $derived.by(() => {
		if (!preset) {
			return
		}
		if (cta === 'explore') {
			return coordPresets.getTargetPreset()
		} else {
			return coordPresets.getPreset(preset)
		}
	})

	function savePreset(preset: Preset) {
		coordPresets.savePreset({
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

<div class="w:full noprint">
	<div class={`l:flex grow justify:${currentPreset ? 'between' : 'end'}`}>
		{#if currentPreset}
			<h2>
				{#if cta !== 'explore'}
					Preset:
					{currentPreset.name}
					{currentPreset.locked ? '(Locked)' : ''}
				{/if}
			</h2>
			<div class="l:flex justify:end maki:block">
				{#if cta === 'write'}
					<DialogSaveSection
						id="add-section"
						color="info"
						asset="plus"
						assetType="svg"
						label="New Section"
						size="xs"
						variant="outline"
						cta="save"
						{formats}
					/>
				{/if}
				{#if cta === 'write' || cta === 'reflect'}
					<Button
						label="Save Preset"
						type="button"
						id="preset-dialog-submit"
						name=""
						asset={query === currentPreset.query || currentPreset.locked
							? 'check'
							: 'save'}
						assetType="svg"
						shape="mellow"
						color="info"
						align="center"
						variant={query === currentPreset.query || currentPreset.locked
							? 'fill'
							: 'outline'}
						size="xs"
						font="sm font:heading"
						disabled={currentPreset.locked || !currentPreset.query}
						onclick={() => savePreset(currentPreset)}
					/>
				{/if}
			</div>
		{:else}
			<h2 class="font:semibold">
				{#if cta === 'write'}
					New Note
				{:else if cta === 'reflect'}
					New Reflection
				{:else if cta === 'explore'}
					New Exploration
				{/if}
			</h2>
			{#if cta === 'write'}
				<div class="maki:block">
					<DialogSaveSection
						id="add-section"
						color="info"
						asset="plus"
						assetType="svg"
						size="xs"
						variant="outline"
						label="New Section"
						cta="save"
						{formats}
					/>
				</div>
			{/if}
		{/if}
	</div>
</div>
