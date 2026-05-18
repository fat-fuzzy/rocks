<script lang="ts">
	import Editor from '$lib/editor/Editor.svelte'
	import ui from '@fat-fuzzy/ui'
	import type {JSONContent} from '@tiptap/core'
	import {onMount} from 'svelte'

	const {Feedback} = ui.blocks
	const {PageMain} = ui.content

	let title = 'Write some Prose'
	let description = 'A rich text editor for the web.'
	let html = $state('')
	let content = $derived({html, json: {}})
	let editor: Editor

	function onExport(editorContent: {html: string; json: JSONContent}) {
		content = editorContent
	}

	function onPageExport() {
		if (editor) {
			content = editor.getContent()
		}
	}

	onMount(() => {
		setTimeout(async () => {
			html = await Promise.resolve('<p>Hello World!</p>')
		}, 3000)
	})
</script>

<PageMain title="" {description}>
	<div class="l:stack:md maki:block:2xl">
		<h1>{title}</h1>

		<Editor
			content={{html: '<p>Hello World!</p>', json: {}}}
			preset="basic"
			id="a-quick-message"
			height="xs"
			width="xl"
		/>

		{#if html}
			<Editor
				bind:this={editor}
				{content}
				preset="full"
				id="an-elaborate-argument"
				height="md"
				width="3xl"
				{onExport}
			/>
		{:else}
			<Feedback context="prose" status="default">
				<p class="l:frame:twin">Loading editor content</p>
			</Feedback>
		{/if}

		<form>
			<button
				onclick={onPageExport}
				class="variant:outline color:primary size:sm"
			>
				Export from editor
			</button>
			<output>
				<pre class="color:primary">{content.html}</pre>
				<pre class="color:accent">{JSON.stringify(content.json, null, 2)}</pre>
			</output>
		</form>
	</div>
</PageMain>
