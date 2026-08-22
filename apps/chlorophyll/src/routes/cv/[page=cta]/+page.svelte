<script lang="ts">
	import type {
		Slug,
		DocLanguage,
		TagGroup,
		IAggregateDocs,
		IAggregateMetadata,
		IAggregateTags,
		IAggregatePresets,
	} from '$types'

	import {getContext, tick} from 'svelte'
	import ui from '@fat-fuzzy/ui'

	import {resolve} from '$app/paths'
	import {page} from '$app/state'
	import {DOC_LANGUAGE, DOC_FORMAT} from '$config/setup'

	import SectionEditor from '$lib/ui/editor/SectionEditor.svelte'
	import SectionBuilder from '$lib/ui/builder/SectionBuilder.svelte'
	import ContentHeading from '$lib/ui/controls/ContentHeading.svelte'
	import ContentActions from '$lib/ui/controls/ContentActions.svelte'
	import Tags from '$lib/ui/controls/tags/Tags.svelte'
	import Presets from '$lib/ui/controls/preset/Presets.svelte'
	import Loading from '$lib/ui/Loading.svelte'

	const {PageRails} = ui.content
	const {Feedback} = ui.blocks

	let aggMetadata: IAggregateMetadata = getContext('aggMetadata')
	let aggDocs: IAggregateDocs = getContext('aggDocs')
	let aggPresets: IAggregatePresets = getContext('aggPresets')
	let aggTags: IAggregateTags = getContext('aggTags')

	let boundForm: HTMLFormElement | undefined = $state()
	let pageContext = $derived({...page.data.pageContext, label: 'On this Page'})

	let cta = $derived(page.params.page)
	let query = $derived(page.url.search)
	let tags = $derived(aggTags.tagGroups)
	let tagsLoading = $derived(aggTags.loading)
	let tagsError = $derived(aggTags.error)

	let editing = $derived(cta === 'build' || cta === 'edit')

	let language = $derived(
		(page.url.searchParams.get('language') || DOC_LANGUAGE) as DocLanguage,
	)
	let format = $derived(
		(page.url.searchParams.get('format') || DOC_FORMAT) as Slug,
	)

	let preset: string | null = $derived(page.url.searchParams.get('preset'))

	let availableSections = $derived(aggDocs.getSections({language, format}))

	let selectedSections = $derived(
		page.url.searchParams
			.getAll('sections')
			.filter((s) => s !== 'all-sections') as Slug[],
	)

	let selectedTags: string[] = $derived(
		aggTags.tagGroups.reduce((selected: string[], menu: TagGroup) => {
			return selected.concat(page.url.searchParams.getAll(menu.name) || [])
		}, []),
	)

	let queryString = $derived(
		`${page.url.pathname}?language=${language}&format=${format}&preset=${preset}`,
	)

	const CTA_TO_TITLE: {[key: string]: string} = {
		edit: 'Content',
		build: 'Structure',
		preview: 'Preview',
		print: 'Print',
	}

	const CTA_TO_DESCRIPTION: {[key: string]: string} = {
		edit: 'Focus on your core message. Make your voice heard.',
		build: 'Structure content to tell your story. Save and modify presets.',
		preview: 'Check your work in progress. Compare content blocks or presets.',
		print: 'Save to PDF using your browser.',
	}

	let title = $derived(cta ? CTA_TO_TITLE[cta] : '')
	let description = $derived(cta ? CTA_TO_DESCRIPTION[cta] : '')

	let ctaClass = $derived(
		cta === 'edit' ? 'doc-editor' : 'doc-builder l:stack:3xl',
	)
	let contentClass = $derived(selectedSections.length === 0 ? '' : ctaClass)

	async function updateFilters() {
		await tick()
		if (boundForm) {
			boundForm.requestSubmit()
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
				formats={aggMetadata.getFormats()}
			/>
		{/if}
	{/snippet}

	{#snippet main()}
		<div class="w:full h:full col:center l:stack">
			{#if aggDocs.loading}
				<div class="l:frame:round">
					<Loading
						message="Loading content..."
						shape="round"
						size="3xl"
						color="primary"
					/>
				</div>
			{:else}
				{#key queryString}
					{#if selectedSections.length === 0}
						<div class={`size:${availableSections.length ? 'lg' : 'md'}`}>
							<Feedback
								context="prose"
								variant="bare"
								size={availableSections.length ? 'lg' : undefined}
								font="md"
							>
								{#if availableSections.length}
									{#if cta === 'edit'}
										<p class="font:md">Select a Section to edit</p>
									{:else if cta === 'build'}
										<p class="font:md">Select a Section to build</p>
									{:else if cta === 'preview'}
										{#if aggPresets.hasPresets()}
											<p class="font:md">Select a Preset to preview</p>
										{:else}
											{@render getStartedPresets()}
										{/if}
									{:else if cta === 'print'}
										{#if aggPresets.hasPresets()}
											<p class="font:md">Select a Preset to print</p>
										{:else}
											{@render getStartedPresets()}
										{/if}
									{/if}
								{:else}
									{@render getStartedSections()}
								{/if}
							</Feedback>
						</div>
					{:else}
						<div class="l:text:xl">
							<div class={contentClass}>
								{#if cta === 'edit'}
									{#each selectedSections as sectionName, i (i)}
										<SectionEditor
											name={sectionName}
											{selectedTags}
											{language}
											{format}
										/>
									{/each}
								{:else if cta}
									{#each selectedSections as sectionName, i (i)}
										<SectionBuilder
											{cta}
											name={sectionName}
											{selectedTags}
											{language}
											{format}
										/>
									{/each}
								{/if}
							</div>
						</div>
					{/if}
				{/key}
			{/if}
		</div>
	{/snippet}

	{#snippet aside()}
		{#if cta}
			<div class="noprint l:stack:xs maki:block:2xl">
				<form bind:this={boundForm} class="l:stack:md">
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
