<script lang="ts">
	import type {Snippet} from 'svelte'
	import type {UiColor} from '@fat-fuzzy/ui'
	import type {
		TagGroup,
		ICoordinateDocs,
		ICoordinateMetadata,
		ICoordinatePresets,
		ActionDoc,
		RouteId,
		ActionResource,
		VitalPage,
	} from '$types'

	import {getContext, tick} from 'svelte'
	import ui from '@fat-fuzzy/ui'

	import {page} from '$app/state'

	import {
		CTA_TO_ACTION,
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

	const {PageRails} = ui.content
	const {Feedback} = ui.blocks

	type Props = {
		theme?: UiColor
		route: RouteId
		query: string
		cta: ActionDoc | ActionResource /* | ActionTransform */
		gettingStarted: {
			[key in ActionDoc | ActionResource]?: {
				sections?: Snippet
				presets?: Snippet
			}
		}
	}

	let {theme = 'primary', route, query, cta, gettingStarted}: Props = $props()

	let coordDocs: ICoordinateDocs = getContext('coordDocs')
	let coordPresets: ICoordinatePresets = getContext('coordPresets')
	let coordMetadata: ICoordinateMetadata = getContext('coordMetadata')

	let filtersForm: HTMLFormElement | undefined = $state()
	let pageContext = $derived({...page.data.pageContext, label: 'On this Page'})

	let color = $derived(theme)
	let pageName = $derived(route.split('/')[1] as VitalPage)

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
	let description = $derived(cta ? CTA_TO_DESCRIPTION[cta] : '')
	let prefix = $derived(getPrefix(language, cta))

	let textClass = $derived(
		cta !== 'edit' || selectedSections.length === 0
			? `l:text:a4`
			: 'l:text:2xl',
	)
	let contentClass = $derived(`doc-${cta} ${textClass} l:stack:lg`)
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
				{color}
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
						{color}
					/>
				</div>
			{:else if availableSections.length === 0}
				<div class={textClass}>
					<div class={`size:${availableSections.length ? 'lg' : 'md'}`}>
						<Feedback
							context="prose"
							variant="bare"
							size={availableSections.length ? 'lg' : undefined}
							font="md"
						>
							{#if gettingStarted[cta]?.sections}
								{@render gettingStarted[cta].sections()}
							{:else if gettingStarted[cta]?.presets}
								{@render gettingStarted[cta].presets()}
							{/if}
						</Feedback>
					</div>
				</div>
			{:else if cta === 'compare'}
				{#if sourcePreset || targetPreset}
					<div class="l:switcher:md th:sm w:full justify:center">
						<div
							class={`scroll:container contain:lg ${contentClass} raviolink`}
						>
							<div
								class={`scroll:y ravioli:lg layer:1 shape:mellow surface:0:${theme} chroma:1`}
							>
								{#each sourceSections as section, i (i)}
									<SectionBuilder
										cta="compare"
										{section}
										selectedTags={sourceTags}
										language={sourceLanguage}
										format={sourceFormat}
										{color}
									/>
								{/each}
							</div>
						</div>

						<div class={`scroll:container contain:lg ${contentClass}`}>
							<div class="l:center scroll:y l:stack justify:start">
								{#key targetPreset}
									{#each targetSections as section, i (i)}
										<SectionEditor
											{section}
											selectedTags={targetTags}
											language={targetLanguage}
											format={targetFormat}
											{color}
										/>
									{/each}
								{/key}
							</div>
						</div>
					</div>
				{:else}
					<div class={textClass}>
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
				<div class={contentClass}>
					{#key language || format || preset}
						{#each selectedSections as section, i (i)}
							{#if cta === 'edit'}
								<SectionEditor
									{section}
									{selectedTags}
									{language}
									{format}
									{color}
								/>
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
			{:else}
				<div class={textClass}>
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
			<div class="noprint l:stack:xs maki:block:lg">
				<form bind:this={filtersForm} class="l:stack:md">
					<ContentActions
						path={pageName}
						oninput={updateFilters}
						{color}
						actions={CTA_TO_ACTION[pageName]}
					/>

					{#if cta !== 'compare'}
						<Presets
							id="preset"
							{route}
							oninput={() => {
								coordPresets.setSourcePreset()
								coordPresets.setTargetPreset()
								updateFilters()
							}}
							currentPreset={preset}
							{color}
						/>
					{:else}
						{#key sourcePreset}
							<Presets
								title="Source Preset (readonly)"
								id="source_preset"
								{route}
								isSource={true}
								oninput={() => coordPresets.setSourcePreset(sourcePreset)}
								currentPreset={sourcePreset}
								{color}
							/>
						{/key}
						{#key targetPreset}
							<Presets
								title="Target Preset (editing)"
								id="target_preset"
								{route}
								isTarget={true}
								oninput={() => coordPresets.setTargetPreset(targetPreset)}
								currentPreset={targetPreset}
								{color}
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
							{color}
						/>
					{/if}
				</form>
			</div>
		{/if}
	{/snippet}
</PageRails>
