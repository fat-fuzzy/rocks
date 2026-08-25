<script lang="ts">
	import type {Slug, DocLanguage, Section, ICoordinateDocs} from '$types'

	import {getContext, onMount} from 'svelte'

	import {isHidden, checkTags} from '$lib/common/tags'

	import {DOC_LANGUAGE, DOC_FORMAT} from '$config/setup'
	import BlockPlaceholder from '$lib/ui/editor/BlockPlaceholder.svelte'
	import BlockEditor from '$lib/ui/editor/BlockEditor.svelte'
	import DialogSaveBlock from '$lib/ui/controls/block/DialogSaveBlock.svelte'
	import FeedbackContent from '$lib/ui/FeedbackContent.svelte'
	import Loading from '$lib/ui/Loading.svelte'

	let coordDocs: ICoordinateDocs = getContext('coordDocs')

	let {
		section,
		selectedTags,
		language = DOC_LANGUAGE,
		format = DOC_FORMAT,
	}: {
		selectedTags: string[]
		section: Section
		language: DocLanguage
		format?: Slug
	} = $props()

	let observerRoot: HTMLElement | undefined = $state()
	let observer: IntersectionObserver | undefined = $state()
	let missingIcon = 'emoji:idea justify:end'
	let loading = $derived(coordDocs.isLoading())

	let name = $derived(section.name)
	let displayBlockForm = $derived(name !== undefined)

	let error = $derived(coordDocs.hasError())
	let blocksLoaded = coordDocs.lazyBlocks
	let sectionsLoaded = coordDocs.lazySections
	let noContentFound = $derived(!loading && !section)

	let subsections = $derived(section?.subsections)
	let content = $derived(section?.content)

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
				coordDocs.lazyLoadBlock(
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

			{#if section.title}
				<h2 class="ravioli:2xs">
					{section.title}
				</h2>
			{/if}

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
					{@const tagSet = new Set(tags)}
					{@const tagsFound = checkTags(tags, selectedTags)}
					{@const subsectionName =
						subsection.name !== section.name ? subsection.name : undefined}

					{#if tagsFound.length}
						{@const subsectionIcon = tagsFound.length === 0 ? missingIcon : ''}

						{#if subsections.length > 1}
							<h3 class="raviolink shape:mellow maki:block surface:0:primary">
								<span class={`${subsectionIcon} maki:inline:md font:heading`}>
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
									tags={Array.from(tagSet)}
								/>
							{:else if block.tags.length === 0 || blockTagsFound.length}
								{#if blockLoaded}
									<BlockEditor
										{...block}
										group={subsectionName}
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
							label="New Block"
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
