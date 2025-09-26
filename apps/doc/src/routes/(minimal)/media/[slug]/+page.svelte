<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {Picture, Zoomer} = ui.drafts
	const {Head} = ui.headless
	const {Sidebar} = ui.layouts

	let stage: boolean | undefined = $state(undefined)
	let media = $derived(page.data)
	let title = $derived(media.title ?? '')
	let description = $derived(media.description ?? '')
	let frameclass = $derived(
		media.height < media.width
			? 'maki:block:2xl l:flex justify:center align:start'
			: '',
	)
</script>

<Head {title} description={`Details page for media: ${title}`} />

<Sidebar {title} {description} size="md">
	{#snippet side()}
		<div class="l:stack:xs l:taco:md maki:block">
			<button
				onclick={() => {
					// TODO: fix this:L use <a> instead
					history.back()
				}}
				class="bg:primary variant:fill size:sm"
			>
				Back
			</button>
			<article>
				<h1>{media.title}</h1>
				<p class="font:md">{media.description}</p>
			</article>
		</div>
	{/snippet}
	{#snippet main()}
		<Sidebar {title} {description} size="2xs end" justify="center">
			{#snippet main()}
				<main class={frameclass} hidden={stage}>
					<Picture
						src={media.src}
						ext={media.ext}
						alt={media.alt}
						orientation={media.orientation}
						width={media.width}
						height={media.height}
						sources={media.sources}
						sizes={media.sizes}
						media={media.media}
					/>
				</main>
			{/snippet}
			{#snippet side()}
				<div class="l:text:lg size:xl maki:auto">
					<Zoomer
						{title}
						{description}
						path={page.url.pathname}
						size="sm"
						layout="center"
						cta="Zoom"
						href="#zoom"
						open={page.url.hash === '#zoom'}
					>
						<div class="zoom l:main:90">
							<Picture
								src={media.src}
								ext={media.ext}
								alt={media.alt}
								orientation={media.orientation}
								dimensions="full"
								loading="lazy"
								width={media.width}
								height={media.height}
								sources={media.sources}
								sizes={media.sizes}
								media={media.media}
							/>
						</div>
					</Zoomer>
				</div>
			{/snippet}
		</Sidebar>
	{/snippet}
</Sidebar>
