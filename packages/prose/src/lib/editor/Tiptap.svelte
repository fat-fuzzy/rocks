<script lang="ts">
	import {onMount, onDestroy} from 'svelte'
	import {Editor} from '@tiptap/core'
	import StarterKit from '@tiptap/starter-kit'
	import {ListItem} from '@tiptap/extension-list'
	import {TextStyleKit} from '@tiptap/extension-text-style'

	import EditorMenu from '$lib/editor/EditorMenu.svelte'

	let element: Element

	// @ts-expect-error editor is not defined at this point but will be on mount
	let editor: Editor = $state()
	let {html}: {html: string} = $props()
	let commands = $state({
		bold: false,
		italic: false,
		strike: false,
		marks: false,
		nodes: false,
		h1: false,
		h2: false,
		h3: false,
		h4: false,
		h5: false,
		h6: false,
		p: false,
		ul: false,
		ol: false,
	})

	function setActiveElement() {
		commands.bold = editor.isActive('bold')
		commands.italic = editor.isActive('italic')
		commands.strike = editor.isActive('strike')
		commands.marks = editor.isActive('marks')
		commands.nodes = editor.isActive('nodes')
		commands.ul = editor.isActive('bulletList')
		commands.ol = editor.isActive('orderedList')
		commands.h1 = editor.isActive('heading', {level: 1})
		commands.h2 = editor.isActive('heading', {level: 2})
		commands.h3 = editor.isActive('heading', {level: 3})
		commands.h4 = editor.isActive('heading', {level: 4})
		commands.h5 = editor.isActive('heading', {level: 5})
		commands.h6 = editor.isActive('heading', {level: 6})
		commands.p = editor.isActive('paragraph')
	}

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit, TextStyleKit, ListItem],
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
		<EditorMenu {editor} {commands} />
	{/if}
	<div class="l:frame:prose maki:block:lg ravioli:md variant:bare dotted">
		<div class="content scroll:y" bind:this={element}></div>
	</div>
</div>

<style nonce="%sveltekit.nonce%">
	.l\:frame\:prose {
		aspect-ratio: 15 / 10;
	}
</style>
