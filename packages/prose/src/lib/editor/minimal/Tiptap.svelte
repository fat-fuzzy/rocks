<script lang="ts">
	import type {UiColor, UiSize, UiVariant} from '@fat-fuzzy/ui'

	import {onMount, onDestroy} from 'svelte'
	import {Editor} from '@tiptap/core'
	import StarterKit from '@tiptap/starter-kit'
	import {TextStyleKit} from '@tiptap/extension-text-style'
	import Link from '@tiptap/extension-link'

	import EditorMenu from '$lib/editor/minimal/EditorMenu.svelte'

	let element: Element

	// @ts-expect-error editor is not defined at this point but will be on mount
	let editor: Editor = $state()
	let {
		html,
		color = 'primary',
		variant = 'outline',
		height = 'xs',
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
		h1: false,
		h2: false,
		h3: false,
		h4: false,
		p: false,
		hr: false,
		link: false,
		isLink: false,
		undo: false,
		redo: false,
	})

	function setActiveElement() {
		commands.bold = editor.isActive('bold')
		commands.italic = editor.isActive('italic')
		commands.h1 = editor.isActive('heading', {level: 1})
		commands.h2 = editor.isActive('heading', {level: 2})
		commands.h3 = editor.isActive('heading', {level: 3})
		commands.h4 = editor.isActive('heading', {level: 4})
		commands.p = editor.isActive('paragraph')
		commands.link = editor.isActive('link')
		commands.hr = editor.isActive('horizontalRule')
	}

	function setDisabledElement() {
		commands.undo = editor.can().chain().focus().undo().run()
		commands.redo = editor.can().chain().focus().redo().run()
		commands.isLink = editor.can().chain().focus().unsetLink().run()
	}

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				TextStyleKit,
				Link.extend({name: 'customLink'}).configure({
					openOnClick: false,
					autolink: true,
					defaultProtocol: 'https',
					protocols: ['http', 'https'],
					isAllowedUri: (url, ctx) => {
						try {
							// construct URL
							const parsedUrl = url.includes(':')
								? new URL(url)
								: new URL(`${ctx.defaultProtocol}://${url}`)

							// use default validation
							if (!ctx.defaultValidate(parsedUrl.href)) {
								return false
							}

							// disallowed protocols
							const disallowedProtocols = ['ftp', 'file', 'mailto']
							const protocol = parsedUrl.protocol.replace(':', '')

							if (disallowedProtocols.includes(protocol)) {
								return false
							}

							// only allow protocols specified in ctx.protocols
							const allowedProtocols = ctx.protocols.map((p) =>
								typeof p === 'string' ? p : p.scheme,
							)

							if (!allowedProtocols.includes(protocol)) {
								return false
							}

							// disallowed domains
							const disallowedDomains = [
								'example-phishing.com',
								'malicious-site.net',
							]
							const domain = parsedUrl.hostname

							if (disallowedDomains.includes(domain)) {
								return false
							}

							// all checks have passed
							return true
						} catch {
							return false
						}
					},
					shouldAutoLink: (url) => {
						try {
							// construct URL
							const parsedUrl = url.includes(':')
								? new URL(url)
								: new URL(`https://${url}`)

							// only auto-link if the domain is not in the disallowed list
							const disallowedDomains = [
								'example-no-autolink.com',
								'another-no-autolink.com',
							]
							const domain = parsedUrl.hostname

							return !disallowedDomains.includes(domain)
						} catch {
							return false
						}
					},
				}),
			],
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
