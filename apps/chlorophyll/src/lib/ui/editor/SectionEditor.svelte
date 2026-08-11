<script lang="ts">
	import type {Slug, DocFormat, DocLanguage, Section, IDocService} from '$types'

	import {getContext, onMount} from 'svelte'

	import {isHidden, checkTags} from '$data/cv/cv-display'
	import {LOCALIZATIONS} from '$lib/intl/l10n'

	import BlockPlaceholder from '$lib/ui/editor/BlockPlaceholder.svelte'
	import BlockEditor from '$lib/ui/editor/BlockEditor.svelte'
	import DialogSaveBlock from '$lib/ui/controls/block/DialogSaveBlock.svelte'
	import FeedbackContent from '$lib/ui/FeedbackContent.svelte'
	import Loading from '$lib/ui/Loading.svelte'

	let docService: IDocService = getContext('docService')

	let {
		name,
		selectedTags,
		language = 'en',
		format = 'long',
	}: {
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
	let displayBlockForm = $derived(name !== undefined)

	let noContentFound = $derived(!section)
	let error = $derived(docService.error)
	let blocksLoaded = docService.blockEditorsLoaded
	let sectionsLoaded = docService.sectionEditorsLoaded

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

<section bind:this={observerRoot}>
	{#if loading}
		<div class="maki:block:xl">
			<Loading message={`Loading ${name}`} />
		</div>
	{:else if error}
		<FeedbackContent {name} content_type="section" isError={true} />
	{:else if noContentFound}
		<FeedbackContent {name} content_type="section" isEmpty={true} />
	{:else if section}
		<details id={`section-${name}`} data-section={name} class="shape:soft" open>
			<summary class="w:full surface:1:neutral ravioli:3xs shape:soft">
				{section.rank}.
				{section.name}
			</summary>
			<h2 class="ravioli:2xs">
				{section.title ?? LOCALIZATIONS[language][name]}
			</h2>

			{#if content}
				{@const blockLoaded = Boolean(sectionsLoaded[section.name])}
				{@const tagsFound = section.tags?.length
					? checkTags(section.tags, selectedTags)
					: []}
				{@const hiddenTag = section.tags?.length
					? isHidden(section.tags, selectedTags)
					: false}

				{#if hiddenTag}
					<FeedbackContent
						name={section.name}
						content_type="section"
						isHidden={true}
					/>
				{:else if !section.tags?.length || tagsFound.length}
					{#if blockLoaded}
						<BlockEditor
							{...section}
							content_type="section"
							sectionName={name}
							{content}
							{language}
							{format}
							tags={section.tags || []}
						/>
					{:else}
						<BlockPlaceholder
							{observer}
							name={section.name}
							sectionName={name}
						/>
					{/if}
				{:else if section.tags?.length}
					<FeedbackContent
						name={section.name}
						content_type="section"
						tags={section.tags}
					/>
				{/if}
			{/if}

			{#if subsections}
				{#each subsections as subsection, i (i)}
					{@const blocks = subsection.blocks}
					{@const tags = subsection.blocks.flatMap((b) => b.tags)}
					{@const tagsFound = checkTags(tags, selectedTags)}
					{@const subsectionName =
						subsection.name !== section.name ? subsection.name : undefined}

					{#if tagsFound.length}
						{@const subsectionIcon = tagsFound.length === 0 ? missingIcon : ''}

						{#if subsections.length > 1}
							<h3 class="font:bold raviolink shape:mellow maki:block">
								<span class={`${subsectionIcon} maki:inline:md'`}>
									{subsection.name}
								</span>
							</h3>
						{/if}

						{#each blocks as block, i (i)}
							{@const blockLoaded = Boolean(blocksLoaded[block.name])}
							{@const blockTagsFound = checkTags(block.tags, selectedTags)}
							{@const hiddenTag = isHidden(block.tags, selectedTags)}

							{#if hiddenTag && blockTagsFound.length}
								<FeedbackContent
									name={section.name}
									content_type="block"
									isHidden={true}
								/>
							{:else if block.tags.length === 0 || blockTagsFound.length}
								{#if blockLoaded}
									<BlockEditor
										{...block}
										sectionName={name}
										content={block.content}
										tagsFound={blockTagsFound}
										{language}
										{format}
									/>
								{:else}
									<BlockPlaceholder
										{observer}
										name={block.name}
										sectionName={name}
										{subsectionName}
									/>
								{/if}
							{/if}
						{/each}
					{:else}
						{@const contentName =
							subsection.name !== section.name ? subsection.name : section.name}
						{@const tagSet = new Set(tags)}
						<FeedbackContent
							name={contentName}
							content_type="block"
							tags={Array.from(tagSet)}
						/>
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
			{#if displayBlockForm}
				<div class="l:flex w:full justify:end align:baseline">
					<div class="maki:block:lg">
						<DialogSaveBlock
							id={`add-block-to-section-${name}`}
							color="primary"
							asset="plus"
							assetType="svg"
							label="Add block"
							cta="save"
							sectionName={name}
							subsections={section.subsections || []}
						/>
					</div>
				</div>
			{/if}
		</details>
	{/if}
</section>
