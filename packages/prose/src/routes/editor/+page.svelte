<script lang="ts">
	import type {JSONContent} from '@tiptap/core'

	import Editor from '$lib/editor/Editor.svelte'
	import ui from '@fat-fuzzy/ui'
	import {onMount} from 'svelte'

	const {Feedback} = ui.blocks
	const {PageMain} = ui.content

	let title = 'Write some Prose'
	let description = 'A rich text editor for the web.'
	let html = $state('')
	let content = $derived({html, json: {}})
	let outputColor = $state('primary')
	let editor: Editor

	function onExport(editorContent: {html: string; json: JSONContent}) {
		content = editorContent
	}

	function changeOutputColor() {
		if (editor) {
			outputColor = 'highlight'
		}
	}

	function onPageExport() {
		if (editor) {
			content = editor.getContent()
		}
	}

	onMount(() => {
		setTimeout(async () => {
			html = await Promise.resolve('<p>An editor with a full menu!</p>')
		}, 3000)
	})
</script>

{#snippet actions()}
	<button
		onclick={changeOutputColor}
		class="variant:outline color:primary size:sm"
	>
		Update color
	</button>
{/snippet}

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
			/>
		{:else}
			<Feedback context="prose" status="default">
				<p class="l:frame:twin">Loading editor content</p>
			</Feedback>
		{/if}

		<Editor
			content={{
				html: '<p>An editor with export capabilities!</p>',
				json: {},
			}}
			preset="basic"
			id="a-quick-message"
			height="xs"
			width="2xl"
			{onExport}
		/>

		<Editor
			content={{html: '<p>An editor with custom actions!</p>', json: {}}}
			preset="basic"
			id="a-quick-message"
			height="xs"
			width="2xl"
			menus={[{options: {id: '123', label: 'More Actions'}, menu: actions}]}
		/>

		<h2>Editor actions output</h2>

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
				<pre class={`color:${outputColor}`}>Test the custom actions</pre>
			</output>
		</form>
	</div>
</PageMain>
