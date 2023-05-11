<script lang="ts">
	import {page} from '$app/stores'
	import {compositions, layouts} from '@fat-fuzzy/ui'
	const {Sidebar} = layouts
	const {RevealNav} = compositions

	let title = ' FatFuzzy Log'
	let description = 'Fat Fuzzy Log: thoughts and choices that provide context for this project'
	$: path = ''
	$: items = [
		{
			slug: 'log',
			title: 'Log',
			items: $page.data.markdowns.map(({meta, path}) => ({
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
		<RevealNav {title} {items} {path} breakpoint="md" size="md" color="primary" />
	</svelte:fragment>
	<div slot="main" class="l:center">
		<slot />
	</div>
</Sidebar>
