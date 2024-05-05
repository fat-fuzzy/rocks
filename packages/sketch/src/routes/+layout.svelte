<script lang="ts">
	import '@fat-fuzzy/style'
	import {page} from '$app/stores'
	import {layouts, recipes} from '@fat-fuzzy/ui-s5'
	const {Sidebar} = layouts
	const {Nav} = recipes

	$: sketches = $page.data.sketches
	$: path = ''
	$: items = sketches
</script>

<Sidebar size="sm">
	<svelte:fragment slot="side">
		<details open>
			<summary class="bg:primary:300 variant:fill">Sketches</summary>
			<Nav
				id="nav-page"
				{items}
				{path}
				size="sm"
				color="bg:primary:light"
				background="polar"
				container="card"
			/>
		</details>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<slot />
	</svelte:fragment>
</Sidebar>
