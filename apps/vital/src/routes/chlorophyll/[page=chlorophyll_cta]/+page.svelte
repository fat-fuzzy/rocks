<script lang="ts">
	import type {
		TagGroup,
		ICoordinateDocs,
		ICoordinateMetadata,
		ICoordinatePresets,
	} from '$types'

	import {getContext, tick} from 'svelte'
	import ui from '@fat-fuzzy/ui'

	import {resolve} from '$app/paths'
	import {page} from '$app/state'

	import {
		CTA_TO_ACTION_DOC,
		CTA_TO_TITLE,
		CTA_TO_DESCRIPTION,
		getPrefix,
	} from '$lib/intl/l10n'

	import {
		getSanitizedParamValueList,
		getAllowedParamsForRoute,
	} from '$lib/common/url'

	import SectionEditor from '$lib/ui/editor/SectionEditor.svelte'
	import SectionBuilder from '$lib/ui/builder/SectionBuilder.svelte'
	import Tags from '$lib/ui/controls/tags/Tags.svelte'
	import Presets from '$lib/ui/controls/preset/Presets.svelte'
	import Loading from '$lib/ui/Loading.svelte'

	import ContentActions from '$lib/ui/controls/ContentActions.svelte'
	import ContentHeading from '$lib/ui/controls/ContentHeading.svelte'
	import {PAGE_TO_THEME} from '$config/setup'

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

	let paramValues = $derived(cta ? getAllowedParamsForRoute(cta, page.url) : {})
	let language = $derived(paramValues.language)
	let format = $derived(paramValues.format)

	let preset: string | null = $derived(paramValues.preset)
	let sourcePreset: string | null = $derived(paramValues.source_preset)
	let targetPreset: string | null = $derived(paramValues.target_preset)

	let sourceLanguage = $derived(paramValues.source_language ?? language)
	let sourceFormat = $derived(paramValues.source_format ?? format)
	let sourcePresetSections = $derived(paramValues.source_sections)
	let sourceTags: string[] = $derived.by(() => {
		const tags = paramValues.source_tags
		if (tags) {
			return tags.split(',')
		}
		return []
	})

	let targetLanguage = $derived(paramValues.target_language ?? language)
	let targetFormat = $derived(paramValues.target_format ?? format)
	let targetPresetSections = $derived(paramValues.target_sections)
	let targetTags: string[] = $derived.by(() => {
		const tags = paramValues.target_tags
		if (tags) {
			return tags.split(',')
		}
		return []
	})

	let unassignedSections = $derived(
		getSanitizedParamValueList(page.url, 'sections'),
	)

	let availableSections = $derived(coordDocs.getSections({language, format}))

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
				const tags = getSanitizedParamValueList(page.url, menu.name)
				return selected.concat(tags || [])
			}, []),
	)

	let title = $derived(
		cta && cta !== 'print'
			? CTA_TO_TITLE[cta]
			: cta === 'print' && preset
				? preset
				: cta
					? CTA_TO_TITLE[cta]
					: '',
	)

	let prefix = $derived(getPrefix(language, cta))

	let description = $derived(cta ? CTA_TO_DESCRIPTION[cta] : '')

	let ctaClass = $derived(`doc-${cta} l:stack:lg`)
	let theme = $derived(PAGE_TO_THEME['chlorophyll'])
	let contentClass = $derived(selectedSections.length === 0 ? '' : ctaClass)
	let mainLayoutClass = $derived(
		cta === 'compare'
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
		if (cta !== 'compare') {
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
				href={resolve('/chlorophyll/edit/')}
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
			href={resolve('/chlorophyll/edit')}
			class="font:semibold"
		>
			Edit
		</a>
		or
		<a href={resolve('/chlorophyll/build')} class="font:semibold"> Build </a>
	</p>
{/snippet}

<PageRails
	{title}
	{prefix}
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
				preset={cta === 'compare' ? targetPreset : preset}
				{query}
				formats={coordMetadata.getFormats()}
				color="accent"
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
						color="accent"
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
				{#if sourcePreset || targetPreset}
					<div class="l:switcher:2xs th:sm w:full">
						<div class="scroll:container contain:lg">
							<div
								class={`l:center scroll:y ravioli:lg surface:0:${theme} muted`}
							>
								{#each sourceSections as section, i (i)}
									<SectionBuilder
										cta="compare"
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
						{/key}
					</div>
				</div>
			{:else}
				<div class="l:text:lg">
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
					<ContentActions
						path="chlorophyll"
						oninput={updateFilters}
						color="accent"
						actions={CTA_TO_ACTION_DOC}
					/>

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
						{#key sourcePreset}
							<Presets
								title="Source Preset (readonly)"
								id="source_preset"
								isSource={true}
								oninput={() => coordPresets.setSourcePreset(sourcePreset)}
								currentPreset={sourcePreset}
							/>
						{/key}
						{#key targetPreset}
							<Presets
								title="Target Preset (editing)"
								id="target_preset"
								isTarget={true}
								oninput={() => coordPresets.setTargetPreset(targetPreset)}
								currentPreset={targetPreset}
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
