<script lang="ts">
	import '@fat-fuzzy/style/css'
	import '$lib/styles/css/main.css'
	import ui from '@fat-fuzzy/ui'

	const {LayoutSidebar} = ui.content
	// import { i18n } from '$lib/i18n';
	// import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	let {children} = $props()
</script>

<!-- 
<ParaglideJS {i18n}>
	{@render children()}
</ParaglideJS> -->

<LayoutSidebar>
	{@render children()}
</LayoutSidebar>
