<script lang="ts">
	import type {
		Preset,
		Slug,
		CurrentCoordinators,
		NamespaceId,
		RouteNameFor,
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
		color = 'neutral',
		size = '2xs',
		font = '2xs',
		canEdit,
	}: {
		cta: RouteNameFor<NamespaceId>
		preset?: string
		query: string
		formats: Slug[]
		color?: UiColor
		size?: UiSize
		font?: UiSize
		canEdit?: {
			presets?: boolean
			doc?: boolean
		}
	} = $props()

	const coordinators: CurrentCoordinators = getContext('currentCoordinators')

	let coordPresets = $derived(coordinators.presets)
	let coordDocs = $derived(coordinators.docs)

	let currentPreset = $derived.by(() => {
		if (!preset) {
			return
		}
		if (cta === 'explore' || cta === 'compare') {
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
			{#if coordPresets.targetPreset}
				<h2>
					Target:
					{currentPreset.name}
					{currentPreset.locked ? '(Locked)' : ''}
				</h2>
			{/if}
			<div class="ui-controls l:flex justify:end maki:block">
				{#if canEdit?.doc}
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
						{coordDocs}
					/>
				{/if}
				{#if canEdit?.presets}
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
		{:else if canEdit?.doc}
			<h2>New Doc</h2>
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
					{coordDocs}
				/>
			</div>
		{/if}
	</div>
</div>
