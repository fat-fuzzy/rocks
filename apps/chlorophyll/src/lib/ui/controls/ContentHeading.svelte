<script lang="ts">
	import type {ActionDoc, Preset, Slug, IAggregatePresets} from '$types'

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
		cta: ActionDoc
		preset: string | null
		query: string
		formats: Slug[]
	} = $props()

	let aggPresets: IAggregatePresets = getContext('aggPresets')
	let currentPreset = $derived(
		preset ? aggPresets.getPreset(preset) : undefined,
	)

	function savePreset(preset: Preset) {
		aggPresets.savePreset({
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
			<h2 class="font:semibold">
				Preset:
				{currentPreset.name}
				{currentPreset.locked ? '(Locked)' : ''}
			</h2>
			<div class="l:flex justify:end maki:block">
				{#if cta === 'edit'}
					<DialogSaveSection
						id="add-section"
						color="accent"
						asset="plus"
						assetType="svg"
						label="New Section"
						size="xs"
						variant="outline"
						cta="save"
						{formats}
					/>
				{/if}
				{#if cta === 'edit' || cta === 'build'}
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
			<h2 class="font:semibold">New Doc</h2>
			{#if cta === 'edit'}
				<div class="maki:block">
					<DialogSaveSection
						id="add-section"
						color="accent"
						asset="plus"
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
