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
	<ff-dialog>
		{#if children}
			{@render children()}
		{/if}
	</ff-dialog>
</dialog>
