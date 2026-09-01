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
				{#if cta === 'analyze'}
					<DialogSaveSection
						id="add-section"
						color="primary"
						asset="plus"
						assetType="svg"
						label="New Section"
						size="xs"
						variant="outline"
						cta="save"
						{formats}
					/>
				{/if}
				{#if cta === 'analyze' || cta === 'engage'}
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
						color="primary"
						align="center"
						variant={query === currentPreset.query || currentPreset.locked
							? 'fill'
							: 'outline'}
						size="xs"
						font="2xs font:heading"
						disabled={currentPreset.locked || !currentPreset.query}
						onclick={() => savePreset(currentPreset)}
					/>
				{/if}
			</div>
		{:else}
			<h2 class="font:semibold">
				{#if cta === 'analyze'}
					New View
				{:else if cta === 'engage'}
					New Milestone
				{/if}
			</h2>
			{#if cta === 'analyze'}
				<div class="maki:block">
					<DialogSaveSection
						id="add-section"
						color="primary"
						asset="plus"
						size="xs"
						assetType="svg"
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
