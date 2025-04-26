<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {Picture} = ui.drafts
	const {Head} = ui.headless
	const {Sidebar} = ui.layouts

	let dialog: HTMLDialogElement
	let stage: boolean | undefined = $state(undefined)
	let media = $derived(page.data)
	let title = $derived(media.title ?? '')
	let description = $derived(media.description ?? '')
	let frameclass = $derived(media.height < media.width ? 'maki:block:2xl' : '')

	function openDialog(e) {
		dialog.show()
		stage = true
		window.scrollTo(0, 0)
	}

	function closeDialog(e) {
		stage = undefined
	}
</script>

<Head {title} description={`Details page for media: ${title}`} />

<Sidebar {title} {description} size="md">
	{#snippet side()}
		<div class="l:stack:xs l:taco:md maki:block">
			<button
				onclick={() => history.back()}
				class="bg:primary variant:fill size:xs"
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
				<div class="l:stack:xs button-zoom maki:block">
					<button
						class="bg:primary variant:outline size:xs"
						onclick={openDialog}
					>
						Zoom
					</button>
				</div>
			{/snippet}
		</Sidebar>
	{/snippet}
</Sidebar>

<dialog bind:this={dialog} class="w:full l:stack:lg surface:0:neutral">
	<form
		method="dialog"
		class="l:side l:flex justify:end button-zoom maki:block:xl"
	>
		<button
			class="bg:primary variant:outline size:xs maki:block"
			onclick={closeDialog}
		>
			Close
		</button>
	</form>
	<div class="zoom l:main:90 col:center">
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
</dialog>

<style>
	@media (max-width: 600px) {
		/* Hide zoom button when there is no room to zoom  */
		:global(.l\:side:has(.button-zoom)) {
			display: none;
			flex-basis: 0;
			flex-grow: 0;
			> * {
				display: none;
			}
		}
	}

	/*   Closed state of the dialog   */
	dialog {
		opacity: 0;
		transform: translateY(0);
		block-size: 0;
		transition:
			opacity 0.3s ease-out,
			transform 0.3s ease-out,
			block-size 0.3s ease-out,
			overlay 0.5s ease-out allow-discrete,
			display 0.5s ease-out allow-discrete;
		> * {
			inline-size: 0;
			block-size: 0;
		}
	}

	/*   Open state of the dialog  */
	dialog[open] {
		position: absolute;
		z-index: 1;
		opacity: 1;
		top: 0;
		overflow: auto;
		transform: scaleY(1);
		padding-block: var(--gap);
		block-size: 100%;
		max-block-size: 100vh;
		> * {
			inline-size: 100%;
			block-size: fit-content;
		}

		> form {
			position: relative;
			top: calc(2 * var(--ui-size) + var(--outline-offset-lg));
		}
	}

	/* Transition the :backdrop when the dialog modal is promoted to the top layer */
	dialog::backdrop {
		background-color: rgb(0 0 0 / 0%);
	}
</style>
