<script lang="ts">
	import type {
		Slug,
		DocLanguage,
		TagGroup,
		ICoordinateDocs,
		ICoordinateMetadata,
		ICoordinatePresets,
	} from '$types'

	import {getContext, tick} from 'svelte'
	import ui from '@fat-fuzzy/ui'

	import {resolve} from '$app/paths'
	import {page} from '$app/state'

	import {DOC_LANGUAGE, DOC_FORMAT} from '$config/setup'
	import {CTA_TO_TITLE, CTA_TO_DESCRIPTION} from '$lib/intl/l10n'

	import SectionEditor from '$lib/ui/editor/SectionEditor.svelte'
	import SectionBuilder from '$lib/ui/builder/SectionBuilder.svelte'
	import Tags from '$lib/ui/controls/tags/Tags.svelte'
	import Presets from '$lib/ui/controls/preset/Presets.svelte'
	import Loading from '$lib/ui/Loading.svelte'
	import ContentHeading from './ContentHeading.svelte'
	import ContentActions from './ContentActions.svelte'

	const {PageRails} = ui.content
	const {Feedback} = ui.blocks

	let coordDocs: ICoordinateDocs = getContext('coordDocs')
	let coordPresets: ICoordinatePresets = getContext('coordPresets')
	let coordMetadata: ICoordinateMetadata = getContext('coordMetadata')

	let filtersForm: HTMLFormElement | undefined = $state()
	let pageContext = $derived({...page.data.pageContext, label: 'On this Page'})

	let cta = $derived(page.params.page)
	let query = $derived(page.url.search)
	let loading = $derived(coordDocs.isLoading())

	let tags = $derived(coordMetadata.getTagGroups())
	let tagsLoading = $derived(coordMetadata.loading)
	let tagsError = $derived(coordMetadata.error)

	let editing = $derived(cta === 'analyze' || cta === 'engage')

	let language = $derived(
		(page.url.searchParams.get('language') || DOC_LANGUAGE) as DocLanguage,
	)
	let format = $derived(
		(page.url.searchParams.get('format') || DOC_FORMAT) as Slug,
	)

	let preset: string | null = $derived(page.url.searchParams.get('preset'))
	let targetPreset: string | null = $derived(
		page.url.searchParams.get('preset-target'),
	)
	let sourcePreset: string | null = $derived(
		page.url.searchParams.get('preset-source'),
	)

	let availableSections = $derived(coordDocs.getSections({language, format}))

	let unassignedSections = $derived(page.url.searchParams.getAll('sections'))

	let sourceLanguage = $derived(
		page.url.searchParams.get('source-language') ?? language,
	)
	let sourceFormat = $derived(
		page.url.searchParams.get('source-format') ?? format,
	)
	let sourcePresetSections = $derived(
		page.url.searchParams.get('source-sections'),
	)
	let sourceTags: string[] = $derived.by(() => {
		const tags = page.url.searchParams.get('source-tags')
		if (tags) {
			return tags.split(',')
		}
		return []
	})

	let targetLanguage = $derived(
		page.url.searchParams.get('target-language') ?? language,
	)
	let targetFormat = $derived(
		page.url.searchParams.get('target-format') ?? format,
	)
	let targetPresetSections = $derived(
		page.url.searchParams.get('target-sections'),
	)
	let targetTags: string[] = $derived.by(() => {
		const tags = page.url.searchParams.get('target-tags')
		if (tags) {
			return tags.split(',')
		}
		return []
	})

	let selectedSections = $derived(
		coordDocs.getSectionsByName({
			language,
			format,
			names: unassignedSections,
		}),
	)

	let targetSections = $derived(
		targetPreset
			? coordDocs.getSectionsByName({
					language: targetLanguage,
					format: targetFormat,
					names: targetPresetSections ? targetPresetSections.split(',') : [],
				})
			: [],
	)

	let sourceSections = $derived(
		sourcePreset
			? coordDocs.getSectionsByName({
					language: sourceLanguage,
					format: sourceFormat,
					names: sourcePresetSections ? sourcePresetSections.split(',') : [],
				})
			: [],
	)

	let selectedTags: string[] = $derived(
		coordMetadata
			.getTagGroups()
			.reduce((selected: string[], menu: TagGroup) => {
				return selected.concat(page.url.searchParams.getAll(menu.name) || [])
			}, []),
	)

	let title = $derived(cta ? CTA_TO_TITLE[cta] : '')
	let description = $derived(cta ? CTA_TO_DESCRIPTION[cta] : '')

	let ctaClass = $derived(
		cta === 'engage' ? 'doc-editor' : 'doc-builder l:stack:3xl',
	)
	let contentClass = $derived(selectedSections.length === 0 ? '' : ctaClass)
	let mainLayoutClass = $derived(
		cta === 'explore'
			? 'w:full col:center l:flex'
			: 'w:full col:center l:stack',
	)

	async function updateFilters() {
		await tick()
		if (filtersForm) {
			filtersForm.requestSubmit()
		}
	}

	$effect(() => {
		if (cta !== 'explore') {
			return
		}

		if (targetPreset) {
			coordPresets.setTargetPreset(targetPreset)
			targetTags = coordPresets.getPresetTags(targetPreset)
		}

		if (sourcePreset) {
			coordPresets.setSourcePreset(sourcePreset)
			sourceTags = coordPresets.getPresetTags(sourcePreset)
		}
	})
</script>

{#snippet getStartedSections()}
	<p>To get started you can:</p>
	<ul>
		<li>
			Create your own content: go to <a
				class="font:semibold"
				href={resolve('/mycelium/analyze/')}
			>
				Analyze
			</a>, then click on
			<span class="font:semibold"> New Section </span>
		</li>
		<li>
			Load the demo: under <span class="font:semibold"> Data > Reset </span>,
			click on
			<span class="font:semibold"> Seed Demo </span>
		</li>
	</ul>
{/snippet}

{#snippet getStartedPresets()}
	<p>
		To get started, first create a Preset from <a
			href={resolve('/mycelium/analyze')}
			class="font:semibold"
		>
			Analyze
		</a>
		or
		<a href={resolve('/mycelium/engage')} class="font:semibold"> Engage </a>
	</p>
{/snippet}

<PageRails
	{title}
	{description}
	size="sm"
	path={page.url.pathname}
	nav={page.data.nav}
	context={pageContext}
	layout="railway"
	headerLayout="sidebar"
>
	{#snippet details()}
		{#if cta}
			<ContentHeading
				{cta}
				preset={cta === 'explore' ? targetPreset : preset}
				{query}
				formats={coordMetadata.getFormats()}
			/>
		{/if}
	{/snippet}

	{#snippet main()}
		<div class={mainLayoutClass}>
			{#if loading}
				<div class="l:frame:round">
					<Loading
						message="Loading content..."
						shape="round"
						size="3xl"
						color="primary"
					/>
				</div>
			{:else if availableSections.length === 0}
				<div class="l:text:xl">
					<div class={`size:${availableSections.length ? 'lg' : 'md'}`}>
						<Feedback
							context="prose"
							variant="bare"
							size={availableSections.length ? 'lg' : undefined}
							font="md"
						>
							{#if cta === 'analyze'}
								{@render getStartedSections()}
							{:else if cta === 'engage'}
								{#if coordPresets.hasPresets()}
									<p class="font:md">Select a Preset to preview</p>
								{:else}
									{@render getStartedPresets()}
								{/if}
							{/if}
						</Feedback>
					</div>
				</div>
			{:else if cta === 'explore'}
				{#if sourcePreset || targetPreset}
					<div class="l:switcher:2xs th:sm w:full">
						<div class="scroll:container contain:lg">
							<div
								class="l:center scroll:y surface:0:primary ravioli:lg shape:soft"
							>
								{#each sourceSections as section, i (i)}
									<SectionBuilder
										cta="explore"
										{section}
										selectedTags={sourceTags}
										language={sourceLanguage}
										format={sourceFormat}
									/>
								{/each}
							</div>
						</div>

						<div class="scroll:container contain:lg">
							<div class="l:center scroll:y l:stack">
								{#key targetPreset}
									{#each targetSections as section, i (i)}
										<SectionEditor
											{section}
											selectedTags={targetTags}
											language={targetLanguage}
											format={targetFormat}
										/>
									{/each}
								{/key}
							</div>
						</div>
					</div>
				{:else}
					<div class="l:text:xl">
						<Feedback
							context="prose"
							variant="bare"
							size={availableSections.length ? 'lg' : undefined}
							font="md"
						>
							<p>
								Select a <span class="font:semibold">Source Preset</span> to get started
							</p>
						</Feedback>
					</div>
				{/if}
			{:else if selectedSections.length}
				<div class="l:text:xl">
					<div class={contentClass}>
						{#key language || format || preset}
							{#each selectedSections as section, i (i)}
								{#if cta === 'engage'}
									<SectionEditor {section} {selectedTags} {language} {format} />
								{:else if cta}
									<SectionBuilder
										{cta}
										{section}
										{selectedTags}
										{language}
										{format}
									/>
								{/if}
							{/each}
						{/key}
					</div>
				</div>
			{:else}
				<div class="l:text:xl">
					<Feedback
						status={coordDocs.hasError() ? 'error' : undefined}
						context="prose"
						variant="bare"
						size={availableSections.length ? 'lg' : undefined}
						font="md"
					>
						{#if coordDocs.hasError()}
							<!-- TODO: Improve this message -->
							<p class="font:md">There was an error loading your document</p>
						{:else}
							<p class="font:md">Select a Section to edit</p>
						{/if}
					</Feedback>
				</div>
			{/if}
		</div>
	{/snippet}

	{#snippet aside()}
		{#if cta}
			<div class="noprint l:stack:xs maki:block:2xl">
				<form bind:this={filtersForm} class="l:stack:md">
					<ContentActions oninput={updateFilters} />

					<Presets
						id="preset"
						oninput={() => {
							coordPresets.setSourcePreset()
							coordPresets.setTargetPreset()
							updateFilters()
						}}
						currentPreset={preset}
					/>
					{#if editing}
						<Tags
							{cta}
							{tags}
							loading={tagsLoading}
							error={tagsError}
							oninput={updateFilters}
						/>
					{/if}
				</form>
			</div>
		{/if}
	{/snippet}
</PageRails>
