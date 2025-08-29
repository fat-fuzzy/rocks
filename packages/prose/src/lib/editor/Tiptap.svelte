<script lang="ts">
	import {onMount, onDestroy} from 'svelte'
	import {Editor} from '@tiptap/core'
	import StarterKit from '@tiptap/starter-kit'

	import Menu from './Menu.svelte'

	let element: Element

	// @ts-expect-error editor is not defined at this point but will be on mount
	let editor: Editor = $state()
	let {html}: {html: string} = $props()
	let commands = $state({
		h1: false,
		h2: false,
		p: false,
	})

	function setActiveElement() {
		commands.h1 = editor.isActive('heading', {level: 1}) ? true : false
		commands.h2 = editor.isActive('heading', {level: 2}) ? true : false
		commands.p = editor.isActive('paragraph') ? true : false
	}

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit],
			content: html,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				setActiveElement()
			},
		})
	})

	onDestroy(() => {
		if (editor) {
			editor.destroy()
		}
	})
</script>

<div class="l:text:lg">
	{#if editor}
		<Menu {editor} {commands} />
	{/if}
	<div
		class="l:frame:prose maki:block:lg ravioli:md variant:bare dotted scroll:y"
	>
		<div class="content" bind:this={element}></div>
	</div>
</div>

<style nonce="%sveltekit.nonce%">
	.l\:frame\:prose {
		aspect-ratio: 15 / 10;
	}
</style>
