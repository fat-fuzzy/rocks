<script lang="ts">
	import {page} from '$app/stores'
	import Sidebar from '$lib/layouts/Sidebar.svelte'
	import SubNav from '$blocks/navs/SubNav.svelte'

	$: items = $page.data.sketches
</script>

<svelte:head>
	<title>FatFuzzy Doc | UI</title>
	<meta name="description" content="Fat Fuzzy Doc - UI Library stories" />
</svelte:head>
<header class="header-page">
	<h1>👾 Play</h1>
</header>
<Sidebar>
	<div slot="side" class="sticky">
		<SubNav {items} id="nav-sketches" title="👾 Sketches" size="md" />
	</div>
	<div slot="main" class="l-stack">
		<slot />
	</div>
</Sidebar>
