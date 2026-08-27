<script lang="ts">
	import type {
		Slug,
		DocLanguage,
		TagGroup,
		ICoordinateDocs,
		ICoordinateMetadata,
		ICoordinatePresets,
		Preset,
	} from '$types'

	import {getContext, tick} from 'svelte'
	import ui from '@fat-fuzzy/ui'

	import {resolve} from '$app/paths'
	import {page} from '$app/state'

	import {DOC_LANGUAGE, DOC_FORMAT} from '$config/setup'
	import {CTA_TO_TITLE, CTA_TO_DESCRIPTION} from '$lib/intl/l10n'

	import SectionEditor from '$lib/ui/editor/SectionEditor.svelte'
	import SectionBuilder from '$lib/ui/builder/SectionBuilder.svelte'
	import ContentHeading from '$lib/ui/controls/ContentHeading.svelte'
	import ContentActions from '$lib/ui/controls/ContentActions.svelte'
	import Tags from '$lib/ui/controls/tags/Tags.svelte'
	import Presets from '$lib/ui/controls/preset/Presets.svelte'
	import Loading from '$lib/ui/Loading.svelte'

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

	let editing = $derived(cta === 'build' || cta === 'edit')

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

	let presetSections = $derived(getSectionsForPreset('preset', preset))
	let targetPresetSections = $derived(
		getSectionsForPreset('preset-target', targetPreset),
	)
	let sourcePresetSections = $derived(
		getSectionsForPreset('preset-source', sourcePreset),
	)

	let presetLanguage = $derived(getLanguageForPreset('preset', preset))

	let targetLanguage = $derived(
		getLanguageForPreset('preset-target', targetPreset),
	)

	let sourceLanguage = $derived(
		getLanguageForPreset('preset-source', sourcePreset),
	)

	let targetFormat = $derived(getFormatForPreset('preset-target', targetPreset))
	let sourceFormat = $derived(getFormatForPreset('preset-source', sourcePreset))

	let selectedSections = $derived(
		preset
			? coordDocs.getSectionsByName({
					language: presetLanguage,
					format,
					names: presetSections,
				})
			: [],
	)

	let targetSections = $derived(
		targetPreset
			? coordDocs.getSectionsByName({
					language: targetLanguage,
					format: targetFormat,
					names: targetPresetSections,
				})
			: [],
	)

	let sourceSections = $derived(
		sourcePreset
			? coordDocs.getSectionsByName({
					language: sourceLanguage,
					format: sourceFormat,
					names: sourcePresetSections,
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
		cta === 'edit' ? 'doc-editor' : 'doc-builder l:stack:3xl',
	)
	let contentClass = $derived(selectedSections.length === 0 ? '' : ctaClass)
	let mainLayoutClass = $derived(
		cta === 'compare'
			? 'w:full col:center l:flex'
			: 'w:full col:center l:stack',
	)

	function getPreset(
		presetKey: Slug,
		presetFound?: string | null,
	): Preset | null {
		let preset = null

		if (presetFound) {
			switch (presetKey) {
				case 'preset':
					preset = coordPresets.getPreset(presetFound)
					break
				case 'preset-source':
					preset = coordPresets.getSourcePreset(presetFound)
					break
				case 'preset-target':
					preset = coordPresets.getTargetPreset(presetFound)
					break
				default:
					break
			}
		}

		return preset
	}

	function getSectionsForPreset(
		presetKey: Slug,
		presetFound?: string | null,
	): string[] {
		let preset = getPreset(presetKey, presetFound)

		if (preset) {
			const queryString = `cv/${cta}${preset.query}`
			const url = new URL(`http://example.com/${queryString}`)
			return url.searchParams
				.getAll('sections')
				.filter((s) => s !== 'all-sections') as Slug[]
		} else {
			return page.url.searchParams
				.getAll('sections')
				.filter((s) => s !== 'all-sections') as Slug[]
		}
	}

	function getLanguageForPreset(
		presetKey: Slug,
		presetFound?: string | null,
	): DocLanguage {
		let language
		let preset = getPreset(presetKey, presetFound)

		if (preset) {
			const queryString = `cv/${cta}${preset.query}`
			const url = new URL(`http://example.com/${queryString}`)
			language = url.searchParams.get('language')
		} else {
			language = page.url.searchParams.get('language')
		}
		if (language) {
			return language
		}

		return DOC_LANGUAGE as DocLanguage
	}

	function getFormatForPreset(
		presetKey: Slug,
		presetFound?: string | null,
	): Slug {
		let format
		let preset = getPreset(presetKey, presetFound)

		if (preset) {
			const queryString = `cv/${cta}${preset.query}`
			const url = new URL(`http://example.com/${queryString}`)
			format = url.searchParams.get('format')
		} else {
			format = page.url.searchParams.get('format')
		}

		if (format) {
			return format
		}

		return DOC_FORMAT as Slug
	}

	async function updateFilters() {
		await tick()
		if (filtersForm) {
			filtersForm.requestSubmit()
		}
	}
</script>

{#snippet getStartedSections()}
	<p>To get started you can:</p>
	<ul>
		<li>
			Create your own content: go to <a
				class="font:semibold"
				href={resolve('/cv/edit/')}
			>
				Edit
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
			href={resolve('/cv/edit')}
			class="font:semibold"
		>
			Edit
		</a>
		or
		<a href={resolve('/cv/build')} class="font:semibold"> Build </a>
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
				{preset}
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
							{#if cta === 'edit' || cta === 'build'}
								{@render getStartedSections()}
							{:else if cta === 'compare'}
								{#if coordPresets.hasPresets()}
									<p class="font:md">Select a Preset to compare</p>
								{:else}
									{@render getStartedPresets()}
								{/if}
							{:else if cta === 'print'}
								{#if coordPresets.hasPresets()}
									<p class="font:md">Select a Preset to print</p>
								{:else}
									{@render getStartedPresets()}
								{/if}
							{/if}
						</Feedback>
					</div>
				</div>
			{:else if cta === 'compare'}
				<div class="l:switcher:2xs th:sm">
					<div class="scroll:container contain:lg">
						<div class="scroll:y surface:0:primary ravioli:lg shape:soft">
							{#each sourceSections as section, i (i)}
								<SectionBuilder
									cta="compare"
									{section}
									{selectedTags}
									language={sourceLanguage}
									format={sourceFormat}
								/>
							{/each}
						</div>
					</div>

					<div class="scroll:container contain:lg">
						<div class="scroll:y">
							{#each targetSections as section, i (i)}
								<SectionEditor
									{section}
									{selectedTags}
									language={targetLanguage}
									format={targetFormat}
								/>
							{/each}
						</div>
					</div>
				</div>
			{:else if selectedSections.length}
				<div class="l:text:xl">
					{#key language || format || preset}
						<div class={contentClass}>
							{#each selectedSections as section, i (i)}
								{#if cta === 'edit'}
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
						</div>
					{/key}
				</div>
			{:else}
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
			{/if}
		</div>
	{/snippet}

	{#snippet aside()}
		{#if cta}
			<div class="noprint l:stack:xs maki:block:2xl">
				<form bind:this={filtersForm} class="l:stack:md">
					<ContentActions oninput={updateFilters} />

					{#if cta !== 'compare'}
						<Presets
							id="preset"
							oninput={() => {
								coordPresets.setSourcePreset()
								coordPresets.setTargetPreset()
								updateFilters()
							}}
							currentPreset={preset}
						/>
					{:else}
						{#key targetPreset}
							<Presets
								title="Target Preset (editing)"
								id="preset-target"
								isTarget={true}
								oninput={() => coordPresets.setTargetPreset(targetPreset)}
								currentPreset={targetPreset}
							/>
						{/key}
						{#key sourcePreset}
							<Presets
								title="Source Preset (readonly)"
								id="preset-source"
								isSource={true}
								oninput={() => coordPresets.setSourcePreset(sourcePreset)}
								currentPreset={sourcePreset}
							/>
						{/key}
					{/if}
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
