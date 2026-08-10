<script lang="ts">
	import type {Slug, DocLanguage, DocFormat} from '$types'

	import {getContext} from 'svelte'
	import ui from '@fat-fuzzy/ui'

	import PresetService from '$lib/services/storage/PresetService.svelte'
	import SectionBuilder from '$lib/ui/builder/SectionBuilder.svelte'
	import PresetHeading from '$lib/ui/controls/preset/PresetHeading.svelte'

	const {Feedback} = ui.blocks

	let {
		cta = 'build',
		selectedSections,
		selectedTags,
		language = 'en',
		format = 'long',
		preset,
		query,
	}: {
		cta: 'build' | 'preview' | 'print'
		language: DocLanguage
		format: DocFormat
		preset?: string
		query: string
		selectedSections: Slug[]
		selectedTags: string[]
	} = $props()

	let presetService: PresetService = getContext('presetService')

	let currentPreset = $derived(
		preset ? presetService.getPreset(preset) : undefined,
	)
	let contentClass = $derived(
		selectedSections.length === 0 ? '' : 'doc-builder l:stack:3xl',
	)
</script>

<div class="w:full l:flex justify:center">
	<div class="l:text:xl align:baseline noprint">
		<div class={`l:flex justify:${currentPreset ? 'between' : 'end'}`}>
			{#if (cta === 'build' || cta === 'preview') && currentPreset}
				<PresetHeading {cta} preset={currentPreset} {query} />
			{/if}
		</div>
	</div>

	{#if selectedSections.length === 0}
		<div class="l:frame size:lg">
			<Feedback
				status="default"
				context="prose"
				variant="bare"
				shape="round"
				asset="default"
				size="lg"
			>
				<p>Select a Section to get started</p>
			</Feedback>
		</div>
	{:else}
		<div class="l:text:xl">
			<div class={contentClass}>
				{#each selectedSections as sectionName, i (i)}
					<SectionBuilder
						{cta}
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
