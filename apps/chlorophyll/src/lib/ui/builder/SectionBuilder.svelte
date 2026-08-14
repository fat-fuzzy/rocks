<script lang="ts">
	import type {Slug, DocFormat, DocLanguage, Section, IDocService} from '$types'

	import {getContext, onMount} from 'svelte'

	import {isHidden, checkTags} from '$data/cv/cv-display'
	import {LOCALIZATIONS} from '$lib/intl/l10n'

	import BlockBuilder from '$lib/ui/builder/BlockBuilder.svelte'
	import FeedbackContent from '$lib/ui/FeedbackContent.svelte'
	import Loading from '$lib/ui/Loading.svelte'

	let docService: IDocService = getContext('docService')

	let {
		cta = 'build',
		name,
		selectedTags,
		language = 'en',
		format = 'long',
	}: {
		cta: 'build' | 'preview' | 'print'
		selectedTags: string[]
		name: Slug
		language: DocLanguage
		format?: DocFormat
	} = $props()

	let observerRoot: HTMLElement | undefined = $state()
	let observer: IntersectionObserver | undefined = $state()
	let missingIcon = 'emoji:idea justify:end'
	let loading = $derived(docService.loading)

	let section: Section = $derived(
		docService.getSectionByName({
			language,
			format,
			name,
		}),
	)

	let subsections = $derived(section?.subsections)
	let content = $derived(section?.content)

	let noContentFound = $derived(!section)
	let error = $derived(docService.error)

	const observerOptions = $derived({
		root: null,
		rootMargin: '800px',
		scrollMargin: '0px',
		threshold: 1.0,
	})

	const onIntersect = (entries: IntersectionObserverEntry[]) => {
		entries.forEach((entry) => {
			const target = entry.target as HTMLElement

			if (entry.isIntersecting) {
				docService.lazyLoadBlock(
					{
						block: target.dataset.block,
						section: target.dataset.section,
						subsection: target.dataset.subsection,
					},
					language,
					format,
					name,
				)
			}
		})
	}

	onMount(() => {
		if (observerRoot) {
			observer = new IntersectionObserver(onIntersect, observerOptions)
		}

		return () => {
			if (observer) {
				observer.disconnect()
			}
		}
	})
</script>

<section class="l:stack:md">
	{#if loading}
		<div class="maki:block:xl">
			<Loading message={`Loading ${name}`} />
		</div>
	{:else if error}
		<FeedbackContent
			name={section.name}
			content_type="section"
			isError={true}
		/>
	{:else if noContentFound}
		<FeedbackContent name="section" content_type="section" isEmpty={true} />
	{:else if section}
		<h2>
			{section.title ?? LOCALIZATIONS[language][name]}
		</h2>

		{#if content}
			{@const tagsFound = section.tags?.length
				? checkTags(section.tags, selectedTags)
				: []}
			{@const hiddenTag = section.tags?.length
				? isHidden(section.tags, selectedTags)
				: false}

			{#if cta === 'build' && hiddenTag}
				<FeedbackContent
					name={section.name}
					content_type="section"
					isHidden={true}
				/>
			{:else if !section.tags?.length || tagsFound.length}
				<BlockBuilder
					content_type="section"
					{...section}
					{content}
					{selectedTags}
					tags={section.tags ?? []}
				/>
			{/if}
		{/if}

		{#if subsections}
			{#each subsections as subsection, i (i)}
				{@const blocks = subsection.blocks}
				{@const tags = subsection.blocks.flatMap((b) => b.tags)}
				{@const tagsFound = checkTags(tags, selectedTags)}

				{#if tagsFound.length}
					{@const subsectionIcon = tagsFound.length === 0 ? missingIcon : ''}

					{#if cta !== 'print' && subsections.length > 1}
						<h3 class="raviolink shape:mellow maki:block surface:0:primary">
							<span class={`${subsectionIcon} maki:inline:md font:heading`}>
								{subsection.name}
							</span>
						</h3>
					{/if}

					{#each blocks as block, i (i)}
						{@const blockTagsFound = checkTags(block.tags, selectedTags)}
						{@const hiddenTag = isHidden(block.tags, selectedTags)}

						{#if cta === 'build' && hiddenTag && blockTagsFound.length}
							<FeedbackContent
								name={section.name}
								content_type="block"
								isHidden={true}
							/>
						{:else if block.tags.length === 0 || blockTagsFound.length}
							<BlockBuilder {...block} content={block.content} {selectedTags} />
						{/if}
					{/each}
				{:else if cta === 'build'}
					{@const contentName =
						subsection.name !== section.name ? subsection.name : section.name}
					<FeedbackContent name={contentName} content_type="block" {tags} />
				{/if}
			{/each}
		{/if}

		{#if !subsections && !content}
			<FeedbackContent
				name={section.name}
				content_type="section"
				tags={section.tags}
			/>
		{/if}
	{/if}
</section>
