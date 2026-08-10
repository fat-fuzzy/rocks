<script lang="ts">
	import type {Slug, DocFormat, DocLanguage} from '$types'

	import {getContext} from 'svelte'
	import ui from '@fat-fuzzy/ui'

	import {page} from '$app/state'

	import PresetService from '$lib/services/storage/PresetService.svelte'
	import SectionEditor from '$lib/ui/editor/SectionEditor.svelte'
	import DialogSaveSection from '$lib/ui/controls/section/DialogSaveSection.svelte'
	import PresetHeading from '$lib/ui/controls/preset/PresetHeading.svelte'

	const {Feedback} = ui.blocks

	let {
		selectedSections,
		selectedTags,
		language = 'en',
		format = 'long',
		preset,
		query,
	}: {
		language: DocLanguage
		format?: DocFormat
		preset?: string
		query: string
		selectedSections: Slug[]
		selectedTags: string[]
	} = $props()

	let presetService: PresetService = getContext('presetService')

	let currentPreset = $derived(
		preset ? presetService.getPreset(preset) : undefined,
	)
	let contentClass = $derived(selectedSections.length === 0 ? '' : 'doc-editor')
</script>

<div class="w:full col:center l:stack">
	<div class="l:text:xl align:baseline">
		<div class={`l:flex justify:${currentPreset ? 'between' : 'end'}`}>
			{#if currentPreset}
				<PresetHeading cta="edit" preset={currentPreset} {query} />

				<DialogSaveSection
					id="add-section"
					color="accent"
					asset="plus"
					assetType="svg"
					label="Add Section"
					size="xs"
					variant="fill"
					cta="save"
					formats={page.data.base.formats}
				/>
			{:else}
				<DialogSaveSection
					id="add-section"
					color="accent"
					asset="plus"
					assetType="svg"
					variant="fill"
					label="Add Section"
					cta="save"
					formats={page.data.base.formats}
				/>
			{/if}
		</div>
	</div>

	{#if selectedSections.length === 0}
		<div class="w:full l:frame size:lg">
			<Feedback
				status="default"
				context="prose"
				variant="bare"
				shape="round"
				asset="default"
				size="lg"
			>
				<p>Add or Select a Section to get started</p>
			</Feedback>
		</div>
	{:else}
		<div class="l:text:xl">
			<div class={contentClass}>
				{#each selectedSections as sectionName, i (i)}
					<SectionEditor
						name={sectionName}
						{selectedTags}
						{language}
						{format}
					/>
				{/each}
			</div>
		</div>
	{/if}
</div>
