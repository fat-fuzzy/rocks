<script lang="ts">
	import {goto} from '$app/navigation'
	import {onMount, type Snippet} from 'svelte'

	let {
		children,
		size = 'md',
		variant = 'outline',
		path,
		cta = 'Zoom',
		href = '#zoom',
		open = false,
	}: {
		title: string
		description: string
		path: string
		size: string
		variant?: string
		layout: string
		children: Snippet
		cta: string
		href: string
		open: boolean
	} = $props()

	let dialog: HTMLDialogElement
	let form: HTMLFormElement

	function openDialog() {
		dialog.show()
		window.scrollTo(0, 0)
	}

	$effect(() => {
		if (dialog) {
			if (open) {
				openDialog()
			} else {
				dialog.close()
			}
		}
	})
</script>

<div
	class={`l:flex maki:block:${size} raviolink zoom-control surface:4:primary shape:mellow variant:${variant} justify:center`}
>
	<a {href} onclick={openDialog}>
		{cta}
	</a>
</div>

<dialog bind:this={dialog} class={`zoomer l:stack:${size}`}>
	<form
		method="dialog"
		bind:this={form}
		class="l:flex justify:end button-zoom ravioli:sm maki:inline"
	>
		<button
			class={`bg:primary variant:outline size:${size}`}
			onclick={() => {
				form.submit()
				goto(path)
			}}
		>
			Close
		</button>
	</form>
	<ff-dialog class="ff-zoom">
		{#if children}
			{@render children()}
		{/if}
	</ff-dialog>
</dialog>
