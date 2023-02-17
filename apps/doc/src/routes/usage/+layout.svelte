<script lang="ts">
	import {page} from '$app/stores'
	import {blocks, layouts} from '@fat-fuzzy/ui'
	const {Sidebar} = layouts
	const {RevealNav} = blocks

	let title = ' FatFuzzy Usage'
	let description = 'Fat Fuzzy Usage: how to use the packages in this project'
	$: path = ''
	$: items = [
		{
			slug: 'usage',
			title: 'Usage',
			items: $page.data.usages.map(({meta, path}) => ({
				id: meta.id,
				slug: meta.slug,
				title: meta.title,
			})),
		},
	]
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<Sidebar size="xs">
	<svelte:fragment slot="side">
		<RevealNav {title} {items} {path} breakpoint="md" size="md" />
	</svelte:fragment>
	<div slot="main" class="l:stack l:text">
		<slot />
	</div>
</Sidebar>
