<script lang="ts">
	import Editor from '$lib/editor/Editor.svelte'
	import ui from '@fat-fuzzy/ui'
	import type {JSONContent} from '@tiptap/core'

	const {PageMain} = ui.content

	let title = 'Write some Prose'
	let description = 'A rich text editor for the web.'
	let html = '<p>Hello World!</p>'
	let content = $state({html, json: {}})

	function onExport(editorContent: {html: string; json: JSONContent}) {
		content = editorContent
	}
</script>

<PageMain title="" {description}>
	<div class="l:stack:md maki:block:2xl">
		<h1>{title}</h1>
		<Editor {html} preset="basic" id="a-quick-message" height="xs" width="xl" />
		<Editor
			{html}
			preset="full"
			id="an-elaborate-argument"
			height="md"
			width="3xl"
			exportFn={onExport}
		/>
		<output>
			<pre class="color:primary">{content.html}</pre>
			<pre class="color:accent">{JSON.stringify(content.json, null, 2)}</pre>
		</output>
	</div>
</PageMain>
