<script lang="ts">
	import type {
		Slug,
		DocFormat,
		DocLanguage,
		TagGroup,
		FrontmatterStructure,
	} from '$types'

	import {getContext, tick} from 'svelte'
	import ui from '@fat-fuzzy/ui'

	import {page} from '$app/state'
	import {
		PUBLIC_DOCUMENT_LANGUAGE,
		PUBLIC_DOCUMENT_FORMAT,
	} from '$app/env/public'

	import DocumentService from '$lib/services/storage/DocumentService.svelte'
	import TagService from '$lib/services/storage/tag-service.svelte'
	import DocumentEditor from '$lib/ui/editor/DocumentEditor.svelte'
	import DocumentBuilder from '$lib/ui/builder/DocumentBuilder.svelte'
	import ContentActions from '$lib/ui/controls/ContentActions.svelte'
	import Tags from '$lib/ui/controls/tags/Tags.svelte'
	import Presets from '$lib/ui/controls/preset/Presets.svelte'
	import Loading from '$lib/ui/Loading.svelte'

	const {PageRails} = ui.content

	let documentService: DocumentService = getContext('documentService')
	let tagService: TagService = getContext('tagService')

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
			PUBLIC_DOCUMENT_LANGUAGE) as DocLanguage,
	)
	let format = $derived(
		(page.url.searchParams.get('format') ||
			PUBLIC_DOCUMENT_FORMAT) as DocFormat,
	)

	let preset: string | undefined = $derived(
		page.url.searchParams.get('preset') ?? undefined,
	)

	let structure = $derived(
		documentService.structures.find(
			(s: FrontmatterStructure) => s.format === format,
		),
	)

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
>
	{#snippet main()}
		{#if documentService.loading}
			<div class="w:full col:center">
				<div class="l:frame:round">
					<Loading
						message="Loading content..."
						shape="round"
						size="3xl"
						color="primary"
					/>
				</div>
			</div>
		{:else}
			{#key queryString}
				{#if cta === 'edit'}
					<DocumentEditor
						{selectedSections}
						{selectedTags}
						{language}
						{format}
						{preset}
						{query}
					/>
				{:else if cta}
					<DocumentBuilder
						{cta}
						{selectedSections}
						{selectedTags}
						{preset}
						{query}
						{language}
						{format}
					/>
				{/if}
			{/key}
		{/if}
	{/snippet}

	{#snippet aside()}
		{#if cta}
			<div class="noprint l:stack:xs maki:block">
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
