<script lang="ts">
	import Tiptap from '$lib/editor/Tiptap.svelte'
	import ui from '@fat-fuzzy/ui'

	const {PageMain} = ui.content

	let title = 'Editor'
	let description = 'A rich text editor for the web.'
	let html = '<p>Hello World!</p>'
</script>

<PageMain {title} {description}>
	<Tiptap {html} />
</PageMain>
