<script lang="ts">
	import TiptapBasic from '$lib/editor/basic/Tiptap.svelte'
	import TiptapFull from '$lib/editor/full/Tiptap.svelte'
	import TiptapMinimal from '$lib/editor/minimal/Tiptap.svelte'
	import ui from '@fat-fuzzy/ui'

	const {PageMain} = ui.content

	let title = 'Editor'
	let description = 'A rich text editor for the web.'
	let html = '<p>Hello World!</p>'
</script>

<PageMain {title} {description}>
	<div>
		<TiptapMinimal {html} />
		<TiptapBasic {html} />
		<TiptapFull {html} />
	</div>
</PageMain>
