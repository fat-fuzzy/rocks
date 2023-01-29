<script lang="ts">
	import {page} from '$app/stores'
	import {blocks, layouts} from '@fat-fuzzy/ui'
	const {Sidebar} = layouts
	const {RevealNav} = blocks

	$: path = ''
	$: items = [
		{
			slug: 'log',
			title: 'Log',
			items: $page.data.logs.map(({meta, path}) => ({
				slug: path,
				title: `${meta.id} - ${meta.title}`,
			})),
		},
	]
</script>

<svelte:head>
	<title>FatFuzzy Log</title>
	<meta
		name="description"
		content="Fat Fuzzy Log: thoughts and choices that provide context for this project"
	/>
</svelte:head>

<Sidebar size="xs">
	<svelte:fragment slot="side">
		<RevealNav title="Fat Fuzzy Log" {items} {path} breakpoint="md" size="md" />
	</svelte:fragment>
	<div slot="main" class="l:stack l:text">
		<slot />
	</div>
</Sidebar>
