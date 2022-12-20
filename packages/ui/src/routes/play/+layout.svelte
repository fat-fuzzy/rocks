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

<Sidebar size="xs">
	<svelte:fragment slot="side">
		<SubNav {items} id="nav-sketches" title="👾 Sketches" breakpoint="bp:md" size="md" />
	</svelte:fragment>
	<div slot="main" class="l-text">
		<slot />
	</div>
</Sidebar>
