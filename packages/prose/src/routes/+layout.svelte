<script lang="ts">
	import '@fat-fuzzy/style/css'
	import '$lib/styles/css/main.css'
	import ui from '@fat-fuzzy/ui'

	const {LayoutSidebar} = ui.content
	// import { i18n } from '$lib/i18n';
	// import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	let {children} = $props()
	let path = ''
	let items = [
		{
			slug: 'entries',
			title: 'Entries',
			items: [],
		},
	]

	let nav = {
		path,
		title: 'Content',
		id: 'nav-blog',
		items,
		reveal: 'expanded',
		background: 'inherit',
		breakpoint: 'sm',
		size: 'md',
		color: 'primary:600',
		position: 'sticky',
		place: 'left',
		formaction: 'toggleSidebar',
	}
</script>

<!-- 
<ParaglideJS {i18n}>
	{@render children()}
</ParaglideJS> -->

<LayoutSidebar {nav}>
	{@render children()}
</LayoutSidebar>
