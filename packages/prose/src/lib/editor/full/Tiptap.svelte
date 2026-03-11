<script lang="ts">
	import type {JSONContent} from '@tiptap/core'
	import type {UiColor, UiSize, UiVariant} from '@fat-fuzzy/ui'

	import '$lib/styles/css/editor.css'
	import DOMPurify from 'dompurify'
	import {browser} from '$app/environment'
	import {onMount, onDestroy} from 'svelte'
	import {Editor} from '@tiptap/core'
	import settings from '$lib/editor/editor-settings'
	import EditorMenu from '$lib/editor/full/EditorMenu.svelte'

	let {
		html,
		id = 'editor-full',
		type,
		tags,
		color = 'primary',
		variant = 'outline',
		height = 'sm',
		onupdate,
		onblur,
	}: {
		html: string
		id?: string
		type?: string
		tags?: string[]
		color?: UiColor
		variant?: UiVariant
		height?: UiSize
		onupdate?: (content: JSONContent) => void
		onblur?: (content: JSONContent) => void
	} = $props()

	let element: Element
	let purify
	let escaped = ''
	// @ts-expect-error editor is not defined at this point but will be on mount
	let editor: Editor = $state()
	let heighClass = $derived(height ? `h:${height}` : '')
	let commands = $state({
		bold: false,
		semibold: false,
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
		link: false,
		isLink: false,
		undo: false,
		redo: false,
	})

	function setActiveElement() {
		commands.bold = editor.isActive('bold')
		commands.semibold = editor.isActive('semibold')
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
		commands.link = editor.isActive('link')
		commands.ol = editor.isActive('orderedList')
		commands.ul = editor.isActive('bulletList')
		commands.hr = editor.isActive('horizontalRule')
		commands.hb = editor.isActive('hardBreak')
	}

	function setDisabledElement() {
		commands.undo = editor.can().chain().focus().undo().run()
		commands.redo = editor.can().chain().focus().redo().run()
		commands.isLink = editor.can().chain().focus().unsetLink().run()
	}

	onMount(() => {
		if (browser) {
			purify = DOMPurify(window)
			escaped = purify.sanitize(html)
		}

		editor = new Editor({
			element: element,
			extensions: settings.extensions,
			content: escaped,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				setActiveElement()
				setDisabledElement()
			},
			onUpdate: onupdate
				? ({editor}: {editor: Editor}) => onupdate(editor.getJSON())
				: undefined,
			onBlur: onblur
				? ({editor}: {editor: Editor}) => onblur(editor.getJSON())
				: undefined,
		})
	})

	onDestroy(() => {
		if (editor) {
			editor.destroy()
		}
	})
</script>

<ff-prose {id} class="l:text:lg" data-type={type} data-tags={tags?.join(':')}>
	{#if editor}
		<EditorMenu {editor} {commands} {color} {variant} />
	{/if}
	<div class={`l:frame:prose ${heighClass} variant:bare dotted`}>
		<div class="content scroll:y" bind:this={element}></div>
	</div>
</ff-prose>
