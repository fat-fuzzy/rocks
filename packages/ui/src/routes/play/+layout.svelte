<script lang="ts">
	import {page} from '$app/stores'
	import Sidebar from '$lib/layouts/Sidebar.svelte'
	import SubNav from '$blocks/navs/SubNav.svelte'

	$: sketches = $page.data.sketches
	$: path = ''
	$: items = [
		{
			slug: 'play',
			title: '❤︎ Sketches',
			items: sketches,
		},
	]
</script>

<svelte:head>
	<title>FatFuzzy Doc | UI</title>
	<meta name="description" content="Fat Fuzzy Doc - UI Library stories" />
</svelte:head>

<Sidebar size="xs">
	<svelte:fragment slot="side">
		<SubNav {items} {path} id="nav-sketches" title="👾 Sketches" breakpoint="bp:md" size="md" />
	</svelte:fragment>
	<svelte:fragment slot="main">
		<slot />
	</svelte:fragment>
</Sidebar>
