<script lang="ts">
	import {page} from '$app/stores'
	import {layouts, compositions} from '@fat-fuzzy/ui'
	const {Sidebar} = layouts
	const {RevealNav} = compositions

	$: sketches = $page.data.sketches
	$: path = ''
	$: items = [
		{
			slug: 'play',
			title: '👾 Sketches',
			items: sketches,
		},
	]
</script>

<svelte:head>
	<title>FatFuzzy Sketches</title>
	<meta
		name="description"
		content="Fat Fuzzy Sketches - canvas & web graphics experiments & tutorial notes"
	/>
</svelte:head>

<Sidebar size="xs">
	<svelte:fragment slot="side">
		<RevealNav {items} {path} id="nav-sketches" title="👾 Sketches" breakpoint="xs" size="md" />
	</svelte:fragment>
	<svelte:fragment slot="main">
		<slot />
	</svelte:fragment>
</Sidebar>
