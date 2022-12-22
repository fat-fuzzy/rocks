<script lang="ts">
	import {page} from '$app/stores'
	import Sidebar from '$lib/layouts/Sidebar.svelte'
	import SubNav from '$blocks/navs/SubNav.svelte'

	$: items = $page.data.sketches
	$: title = $page.data.title
</script>

<svelte:head>
	<title>FatFuzzy Doc | UI</title>
	<meta name="description" content="Fat Fuzzy Doc - UI Library stories" />
</svelte:head>

<Sidebar size="xs">
	<svelte:fragment slot="main">
		<header class="header-page">
			<h1>👾 Play&nbsp;</h1>
			<h2>❤︎&nbsp;&nbsp;{title}</h2>
		</header>
		<slot />
	</svelte:fragment>
	<svelte:fragment slot="side">
		<SubNav {items} id="nav-sketches" title="👾 Sketches" breakpoint="bp:md" size="md" />
	</svelte:fragment>
</Sidebar>
