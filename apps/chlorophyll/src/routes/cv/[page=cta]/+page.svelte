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

	let availableSections = $derived(coordDocs.getSections({language, format}))

	let urlSections = $derived(
		page.url.searchParams
			.getAll('sections')
			.filter((s) => s !== 'all-sections') as Slug[],
	)

	let selectedSections = $derived(
		coordDocs.getSectionsByName({
			language,
			format,
			names: urlSections,
		}),
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
		<div class="w:full h:full col:center l:stack">
			{#if loading}
				<div class="l:frame:round">
					<Loading
						message="Loading content..."
						shape="round"
						size="3xl"
						color="primary"
					/>
				</div>
			{:else}
				<div class="l:text:xl">
					{#if availableSections.length === 0}
						<div class={`size:${availableSections.length ? 'lg' : 'md'}`}>
							<Feedback
								context="prose"
								variant="bare"
								size={availableSections.length ? 'lg' : undefined}
								font="md"
							>
								{#if cta === 'edit' || cta === 'build'}
									{@render getStartedSections()}
								{:else if cta === 'preview'}
									{#if coordPresets.hasPresets()}
										<p class="font:md">Select a Preset to preview</p>
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
					{:else if selectedSections.length > 0}
						{#key language || format || preset}
							<div class={contentClass}>
								{#each selectedSections as section, i (i)}
									{#if cta === 'edit'}
										<SectionEditor
											{section}
											{selectedTags}
											{language}
											{format}
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
							</div>
						{/key}
					{:else}
						<Feedback
							context="prose"
							variant="bare"
							size={availableSections.length ? 'lg' : undefined}
							font="md"
						>
							<p class="font:md">Select a Section to edit</p>
						</Feedback>
					{/if}
				</div>
			{/if}
		</div>
	{/snippet}

	{#snippet aside()}
		{#if cta}
			<div class="noprint l:stack:xs maki:block:2xl">
				<form bind:this={filtersForm} class="l:stack:md">
					<ContentActions oninput={updateFilters} />

					<Presets oninput={updateFilters} currentPreset={preset} />

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
