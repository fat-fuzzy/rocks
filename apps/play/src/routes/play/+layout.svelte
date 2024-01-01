<script lang="ts">
	import {page} from '$app/stores'
	import {layouts, recipes} from '@fat-fuzzy/ui'
	const {Sidebar} = layouts
	const {Nav} = recipes

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

<Sidebar size="xs">
	<svelte:fragment slot="side">
		<Nav
			id="nav-page"
			{items}
			{path}
			size="sm"
			color="bg:primary:light"
			background="polar"
			container="card"
		/>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<slot />
	</svelte:fragment>
</Sidebar>
