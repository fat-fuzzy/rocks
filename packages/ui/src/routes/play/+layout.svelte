<script lang="ts">
	import {page} from '$app/stores'
	import Sidebar from '$lib/layouts/Sidebar.svelte'
	import SubNav from '$blocks/navs/SubNav.svelte'

	$: sketches = $page.data.sketches
	const items: {slug: string; title: string; emoji: string}[] = sketches

	// TODO: fix links
</script>

<svelte:head>
	<title>FatFuzzy Doc | UI</title>
	<meta name="description" content="Fat Fuzzy Doc - UI Library stories" />
</svelte:head>

<Sidebar placement="start">
	<div slot="side" class="sticky">
		<SubNav {items} id="nav-sketches" title="👾 Sketches" size="md" />
	</div>
	<div slot="main" class="l-stack">
		<slot />
	</div>
</Sidebar>
