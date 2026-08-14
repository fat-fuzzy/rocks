<script lang="ts">
	import type {
		Slug,
		DocFormat,
		DocLanguage,
		TagGroup,
		FrontmatterStructure,
		IDocService,
		ITagService,
	} from '$types'

	import {getContext, tick} from 'svelte'
	import ui from '@fat-fuzzy/ui'

	import {page} from '$app/state'
	import {PUBLIC_DOC_LANGUAGE, PUBLIC_DOC_FORMAT} from '$app/env/public'

	import SectionEditor from '$lib/ui/editor/SectionEditor.svelte'
	import SectionBuilder from '$lib/ui/builder/SectionBuilder.svelte'
	import ContentHeading from '$lib/ui/controls/ContentHeading.svelte'
	import ContentActions from '$lib/ui/controls/ContentActions.svelte'
	import Tags from '$lib/ui/controls/tags/Tags.svelte'
	import Presets from '$lib/ui/controls/preset/Presets.svelte'
	import Loading from '$lib/ui/Loading.svelte'

	const {PageRails} = ui.content
	const {Feedback} = ui.blocks

	let docService: IDocService = getContext('docService')
	let tagService: ITagService = getContext('tagService')

	let boundForm: HTMLFormElement | undefined = $state()
	let pageContext = $derived({...page.data.pageContext, label: 'On this Page'})

	let cta = $derived(page.params.page)
	let query = $derived(page.url.search)
	let tags = $derived(tagService.tags)
	let tagsLoading = $derived(tagService.loading)
	let tagsError = $derived(tagService.error)

	let editing = $derived(cta === 'build' || cta === 'edit')

	let language = $derived(
		(page.url.searchParams.get('language') ||
			PUBLIC_DOC_LANGUAGE) as DocLanguage,
	)
	let format = $derived(
		(page.url.searchParams.get('format') || PUBLIC_DOC_FORMAT) as DocFormat,
	)

	let preset: string | null = $derived(page.url.searchParams.get('preset'))

	let structure = $derived(
		docService.structures.find(
			(s: FrontmatterStructure) => s.format === format,
		),
	)

	let availableSections = $derived(Object.values(docService.docIndex.sections))

	let selectedSections = $derived(
		page.url.searchParams
			.getAll('sections')
			.filter((s) => s !== 'all-sections') as Slug[],
	)

	let selectedTags: string[] = $derived(
		tagService.tags.reduce((selected: string[], menu: TagGroup) => {
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

	let title = $derived(cta ? CTA_TO_TITLE[cta] : '')

	let description = $derived(structure?.name || '')

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
				formats={docService.base.formats}
			/>
		{/if}
	{/snippet}

	{#snippet main()}
		<div class="w:full h:full col:center l:stack">
			{#if docService.loading}
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
						<div
							class={`l:frame size:${availableSections.length ? 'lg' : 'md'}`}
						>
							<Feedback
								context="prose"
								variant="bare"
								shape={availableSections.length ? 'round' : undefined}
								asset={availableSections.length ? 'default' : 'none'}
								size={availableSections.length ? 'lg' : undefined}
							>
								{#if availableSections.length}
									<p>Select a Section to get started</p>
								{:else}
									<p>To get started you can:</p>
									<ul>
										<li>
											Create your own content: click on <span
												class="font:semibold"
											>
												Add Section
											</span>
										</li>
										<li>
											Load the demo: go to <span class="font:semibold">
												Data > Reset
											</span>
											and click on
											<span class="font:semibold"> Seed Demo </span>
										</li>
									</ul>
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
