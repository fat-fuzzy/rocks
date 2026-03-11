<script lang="ts">
	import TiptapBasic from '$lib/editor/basic/Tiptap.svelte'
	import TiptapFull from '$lib/editor/full/Tiptap.svelte'
	import ui from '@fat-fuzzy/ui'

	const {PageMain} = ui.content

	let title = 'Write some Prose'
	let description = 'A rich text editor for the web.'
	let html = '<p>Hello World!</p>'
</script>

<PageMain title="" {description}>
	<div class="l:stack:md maki:block:2xl">
		<h1>{title}</h1>
		<TiptapBasic
			{html}
			id="a-quick-message"
			tags={['short', 'sweet']}
			height="xs"
		/>
		<TiptapFull
			{html}
			id="an-elaborate-argument"
			tags={['draw', 'conclusion']}
			height="md"
		/>
	</div>
</PageMain>
