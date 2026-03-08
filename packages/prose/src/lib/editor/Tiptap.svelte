<script lang="ts">
	import type {UiColor, UiSize, UiVariant} from '@fat-fuzzy/ui'

	import {onMount, onDestroy} from 'svelte'
	import {Editor} from '@tiptap/core'
	import StarterKit from '@tiptap/starter-kit'
	import {TextStyleKit} from '@tiptap/extension-text-style'

	import EditorMenu from '$lib/editor/EditorMenu.svelte'

	let element: Element

	// @ts-expect-error editor is not defined at this point but will be on mount
	let editor: Editor = $state()
	let {
		html,
		color = 'primary',
		variant = 'outline',
		height = 'md',
	}: {
		html: string
		color?: UiColor
		variant?: UiVariant
		height?: UiSize
	} = $props()

	let heighClass = $derived(height ? `h:${height}` : '')
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
		ol: false,
		ul: false,
		hr: false,
		hb: false,
		undo: false,
		redo: false,
	})

	function setActiveElement() {
		commands.bold = editor.isActive('bold')
		commands.italic = editor.isActive('italic')
		commands.strike = editor.isActive('strike')
		commands.marks = editor.isActive('marks')
		commands.nodes = editor.isActive('nodes')
		commands.h1 = editor.isActive('heading', {level: 1})
		commands.h2 = editor.isActive('heading', {level: 2})
		commands.h3 = editor.isActive('heading', {level: 3})
		commands.h4 = editor.isActive('heading', {level: 4})
		commands.h5 = editor.isActive('heading', {level: 5})
		commands.h6 = editor.isActive('heading', {level: 6})
		commands.p = editor.isActive('paragraph')
		commands.ol = editor.isActive('orderedList')
		commands.ul = editor.isActive('bulletList')
		commands.hr = editor.isActive('horizontalRule')
		commands.hb = editor.isActive('hardBreak')
	}

	function setDisabledElement() {
		commands.undo = editor.can().chain().focus().undo().run()
		commands.redo = editor.can().chain().focus().redo().run()
	}

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit, TextStyleKit],
			content: html,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				setActiveElement()
				setDisabledElement()
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
		<EditorMenu {editor} {commands} {color} {variant} />
	{/if}
	<div
		class={`l:frame:prose ${heighClass} maki:block:lg ravioli:md variant:bare dotted`}
	>
		<div class="content scroll:y" bind:this={element}></div>
	</div>
</div>

<style nonce="%sveltekit.nonce%">
	.l\:frame\:prose {
		aspect-ratio: 15 / 8;
	}

	.l\:frame\:prose.h\:xs {
		aspect-ratio: 15 / 3;
	}

	.l\:frame\:prose.h\:sm {
		aspect-ratio: 15 / 5;
	}

	.l\:frame\:prose.h\:md {
		aspect-ratio: 15 / 8;
	}
	.l\:frame\:prose.h\:lg {
		aspect-ratio: 15 / 10;
	}
</style>
