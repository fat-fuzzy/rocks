<script lang="ts">
	import '@fat-fuzzy/style'
	import {page} from '$app/stores'
	import {layouts, recipes} from '@fat-fuzzy/ui-s5'
	import type { Snippet } from 'svelte'
	const {Sidebar} = layouts
	const {Nav} = recipes

	type Props = {
		children: Snippet
	}

	let {children}: Props = $props()

	let sketches = $state($page.data.sketches)
	let path = ''
	let items = sketches
</script>

<Sidebar size="md">
	{#snippet side()}
		<details open>
			<summary class="bg:primary:300 variant:fill">Sketches</summary>
				<Nav
				id="nav-page"
				title="nav-page"
				{items}
				{path}
				size="xs"
				color="bg:primary:light"
				background="polar"
				container="card"
				layout="switcher"
			/>
		</details>
	{/snippet}
	{#snippet main()}
		{#if children}
			{@render children()}
		{/if}
	{/snippet}
</Sidebar>
