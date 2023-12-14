<script lang="ts">
	import {page} from '$app/stores'
	import {layouts, compositions} from '@fat-fuzzy/ui'
	const {Sidebar} = layouts
	const {Nav} = compositions

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
		<Nav
			id="nav-page"
			{items}
			{path}
			size="md"
			color="bg:primary:light"
			background="polar"
			container="card"
		/>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<slot />
	</svelte:fragment>
</Sidebar>
