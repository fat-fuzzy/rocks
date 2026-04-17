<script lang="ts">
	import type {Snippet} from 'svelte'
	import type {JSONContent} from '@tiptap/core'
	import type {UiColor, UiSize, UiVariant} from '@fat-fuzzy/ui'

	import '$lib/styles/css/editor.css'
	import DOMPurify from 'dompurify'
	import {browser} from '$app/environment'
	import {onMount, onDestroy} from 'svelte'
	import {Editor} from '@tiptap/core'
	import settings from '$lib/editor/editor-settings'
	import EditorMenu from '$lib/editor/EditorMenu.svelte'

	let {
		html,
		id = 'editor',
		type,
		menus,
		preset = 'basic',
		color = 'primary',
		variant = 'outline',
		height = 'sm', // Editor total width
		width = 'xl', // Editor height with scroll overflow
		onupdate,
		onblur,
		init,
		onExport, // Custom event
	}: {
		html: string
		id?: string
		type?: string
		menus?: Snippet
		preset?: string
		color?: UiColor
		variant?: UiVariant
		height?: UiSize
		width?: UiSize
		onupdate?: (content: {json: JSONContent; html: string}) => void
		onblur?: (content: {json: JSONContent; html: string}) => void
		init?: (content: {json: JSONContent; html: string}) => void
		onExport?: (content: {json: JSONContent; html: string}) => void
	} = $props()

	let element: Element

	// TODO: watch this: https://developer.mozilla.org/en-US/docs/Web/API/Element/setHTML
	let purify: typeof DOMPurify
	let escaped = $state('')
	let jsonContent: JSONContent = $state({})
	let snapshot = $derived({
		html: escaped,
		json: jsonContent,
	})

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
		commands.bold = editor.isActive('customBold')
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

	export function getContent() {
		if (editor) {
			updateContent(editor)
		}

		return snapshot
	}

	function updateContent(editor: Editor) {
		escaped = purify.sanitize(editor.getHTML())
		jsonContent = editor.getJSON()

		return snapshot
	}

	function handleUpdate({editor}: {editor: Editor}) {
		if (onupdate) {
			onupdate(updateContent(editor))
		}
	}

	function handleBlur({editor}: {editor: Editor}) {
		if (onblur) {
			onblur(updateContent(editor))
		}
	}

	function onInit({editor}: {editor: Editor}) {
		if (init) {
			init(updateContent(editor))
		}
	}

	function handleExport() {
		if (onExport) {
			onExport(updateContent(editor))
		}
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
			onUpdate: handleUpdate,
			onBlur: handleBlur,
		})

		onInit({editor})
	})

	onDestroy(() => {
		if (editor) {
			editor.destroy()
		}
	})
</script>

<ff-prose
	id={id ?? `${id}-${preset}`}
	class={`l:text:${width}`}
	data-type={type}
>
	{#if editor}
		<EditorMenu
			id={id ? `menu-${id}` : `menu-${id}-${preset}`}
			{editor}
			{commands}
			{color}
			{variant}
			{preset}
			children={menus}
			onExport={onExport ? handleExport : undefined}
		/>
	{/if}
	<div class={`prose-editor ${heighClass} variant:bare dotted`}>
		<div class="content scroll:container" bind:this={element}></div>
	</div>
</ff-prose>
