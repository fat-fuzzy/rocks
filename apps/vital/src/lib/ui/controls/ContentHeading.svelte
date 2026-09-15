<script lang="ts">
	import type {
		ActionDoc,
		Preset,
		Slug,
		ICoordinatePresets,
		ActionResource,
		ActionTransform,
	} from '$types'

	import {getContext} from 'svelte'
	import ui, {type UiColor, type UiSize} from '@fat-fuzzy/ui'
	import DialogSaveSection from '$lib/ui/controls/section/DialogSaveSection.svelte'

	const {Button} = ui.blocks

	const {
		cta,
		preset,
		query,
		formats,
		color,
		size = '2xs',
		font = '2xs',
	}: {
		cta: ActionDoc | ActionResource | ActionTransform
		preset: string | null
		query: string
		formats: Slug[]
		color?: UiColor
		size?: UiSize
		font?: UiSize
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
			{#if cta !== 'explore'}
				<h2>
					Preset:
					{currentPreset.name}
					{currentPreset.locked ? '(Locked)' : ''}
				</h2>
			{/if}
			<div class="ui-controls l:flex justify:end maki:block">
				{#if cta === 'edit' || cta === 'write' || cta === 'analyze'}
					<DialogSaveSection
						id="add-section"
						label="New Section"
						cta="save"
						{formats}
						{size}
						{font}
						{color}
						variant="outline"
						asset="plus"
						assetType="svg"
					/>
				{/if}
				{#if cta === 'edit' || cta === 'write' || cta === 'reflect' || cta === 'build' || cta === 'analyze' || cta === 'engage'}
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
						align="center"
						variant={query === currentPreset.query || currentPreset.locked
							? 'fill'
							: 'outline'}
						{color}
						{size}
						{font}
						disabled={currentPreset.locked || !currentPreset.query}
						onclick={() => savePreset(currentPreset)}
					/>
				{/if}
			</div>
		{:else}
			<h2>
				{#if cta === 'analyze'}
					New View
				{:else if cta === 'engage'}
					New Milestone
				{:else if cta === 'write'}
					New Note
				{:else if cta === 'reflect'}
					New Reflection
				{:else if cta === 'explore'}
					New Exploration
				{:else}
					New Doc
				{/if}
			</h2>
			{#if cta === 'edit' || cta === 'write' || cta === 'analyze'}
				<div class="ui-controls maki:block">
					<DialogSaveSection
						id="add-section"
						label="New Section"
						cta="save"
						{formats}
						{size}
						{font}
						{color}
						variant="outline"
						asset="plus"
						assetType="svg"
					/>
				</div>
			{/if}
		{/if}
	</div>
</div>
