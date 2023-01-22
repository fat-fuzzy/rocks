<script lang="ts">
	import {page} from '$app/stores'
	import {blocks, layouts} from '@fat-fuzzy/ui'
	const {Sidebar} = layouts
	const {RevealNav} = blocks

	$: path = ''
	$: items = [
		{
			slug: 'decisions',
			title: 'Decisions',
			items: $page.data.decisions.map(({meta, path}) => ({
				slug: path,
				title: `${meta.id} - ${meta.title}`,
			})),
		},
	]
</script>

<svelte:head>
	<title>FatFuzzy Doc | Decisions</title>
	<meta name="description" content="Fat Fuzzy Doc - Log of architectural decisions" />
</svelte:head>

<Sidebar size="xs">
	<svelte:fragment slot="side">
		<RevealNav title="Fat Fuzzy Decisions" {items} {path} breakpoint="bp:md" size="md" />
	</svelte:fragment>
	<div slot="main" class="l-stack l-text">
		<slot />
	</div>
</Sidebar>
