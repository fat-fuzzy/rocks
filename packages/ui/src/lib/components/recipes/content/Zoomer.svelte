<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'
	import type {Snippet} from 'svelte'

	const {Picture} = ui.drafts

	let {
		children,
		title,
		description,
		path,
		size = 'md',
		variant = 'outline',
		layout = 'center',
		cta = 'Zoom',
	}: {
		title: string
		description: string
		path: string
		size: string
		variant: string
		layout: string
		children: Snippet
		cta: string
	} = $props()
	let dialog: HTMLDialogElement
	let stage: boolean | undefined = $state(undefined)
	let media = $derived(page.data)
	let frameclass = $derived(
		media.height && media.height < media.width ? 'maki:block:2xl' : '',
	)

	function openDialog(e) {
		dialog.show()
		stage = true
		window.scrollTo(0, 0)
	}

	function closeDialog(e) {
		stage = undefined
	}
</script>

<button
	class={`bg:primary variant:${variant}  size:${size} maki:block`}
	onclick={openDialog}
>
	{cta}
</button>

<dialog
	bind:this={dialog}
	class="w:full l:stack:lg surface:0:neutral ravioli:md"
>
	<form method="dialog" class="l:flex justify:end button-zoom ravioli:md">
		<button
			class="bg:primary variant:outline size:xs maki:block"
			onclick={closeDialog}
		>
			Close
		</button>
	</form>
	{#if media.src}
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
	{:else if children}
		{@render children()}
	{/if}
</dialog>

<style>
	@media (max-width: 600px) {
		/* Hide zoom button when there is no roo mto zoom  */
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
		block-size: fit-content;
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
