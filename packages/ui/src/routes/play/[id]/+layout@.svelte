<script lang="ts">
	import {page} from '$app/stores'
	import Sidebar from '$lib/layouts/Sidebar.svelte'
	import SubNav from '$blocks/navs/SubNav.svelte'

	$: sketches = $page.data.sketches
</script>

<svelte:head>
	<title>FatFuzzy Doc | Sketches</title>
	<meta name="description" content="Fat Fuzzy Doc - Log of architectural components" />
</svelte:head>

<Sidebar placement="start">
	<div slot="side" class="sticky" />
	<div slot="main" class="l-stack">
		<slot />
	</div>
</Sidebar>
