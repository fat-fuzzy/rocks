<script lang="ts">
	import Editor from '$lib/editor/Editor.svelte'
	import ui from '@fat-fuzzy/ui'

	const {PageMain} = ui.content

	let title = 'Write some Prose'
	let description = 'A rich text editor for the web.'
	let html = '<p>Hello World!</p>'
</script>

<PageMain title="" {description}>
	<div class="l:stack:md maki:block:2xl">
		<h1>{title}</h1>
		<Editor
			{html}
			preset="basic"
			id="a-quick-message"
			tags={['short', 'sweet']}
			height="xs"
		/>
		<Editor
			{html}
			preset="full"
			id="an-elaborate-argument"
			tags={['draw', 'conclusion']}
			height="md"
		/>
	</div>
</PageMain>
