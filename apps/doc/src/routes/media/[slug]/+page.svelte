<script lang="ts">
	import {page} from '$app/stores'
	import ui from '@fat-fuzzy/ui'

	const {Picture} = ui.drafts
	const {Sidebar} = ui.layouts

	let dialog: HTMLDialogElement
	let stage: boolean|undefined = $state(undefined)
	let media = $derived($page.data)
	let title = $derived(media.title ?? '')
	let description = $derived(media.description ?? '')

	function openDialog(e) {
		dialog.show()
		stage = true
	}

	function closeDialog(e) {
		stage = undefined
	}
</script>

<Sidebar {title} {description} size="2xs" justify="center">
	{#snippet side()}

	<div class="l:stack:xs">
		<button
			onclick={() => history.back()}
			class="bg:primary variant:fill size:xs"
		>
			Back
		</button>

		<button id="button-zoom"
		class="bg:primary variant:outline size:xs" onclick={openDialog}>
			Zoom
		</button>

	</div>
	{/snippet}
	{#snippet main()}
		<div class='l:center:md' hidden={stage}>
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
		</div>
	{/snippet}
</Sidebar>

<dialog
	bind:this={dialog}
	class="w:full sticky l:sidebar:2xs bg:inherit"
>
	<form method="dialog" class="l:side hug">
		<button class="bg:primary variant:outline size:xs" onclick={closeDialog}> Close </button>
	</form>
	<div class="l:main:90 col:center">
		<Picture
			src={media.src}
			ext={media.ext}
			alt={media.alt}
			orientation={media.orientation}
			dimensions='full'
			loading=lazy
			width={media.width}
			height={media.height}
			sources={media.sources}
			sizes={media.sizes}
			media={media.media}
		/>
	</div>
</dialog>

<style>
	@media (max-width: 480px) {
		#button-zoom {
			display: none;
		}
	}

	/*   Closed state of the dialog   */
	dialog {
		opacity: 0;
		transform: translateY(0);
		transition:
			opacity 0.3s ease-out,
			transform 0.3s ease-out,
			overlay 0.5s ease-out allow-discrete,
			display 0.5s ease-out allow-discrete;
	}

	/*   Open state of the dialog  */
	dialog[open] {
		position: absolute;
		z-index: 1;
		opacity: 1;
		top: 0;
		transform: scaleY(1);
		overflow: auto;
		padding-block-end: 5rem;
	}

	/* Transition the :backdrop when the dialog modal is promoted to the top layer */
	dialog::backdrop {
		background-color: rgb(0 0 0 / 0%);
	}
</style>
