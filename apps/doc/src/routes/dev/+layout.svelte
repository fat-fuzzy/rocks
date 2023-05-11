<script lang="ts">
	import {page} from '$app/stores'
	import {compositions, layouts} from '@fat-fuzzy/ui'
	const {Sidebar} = layouts
	const {RevealNav} = compositions

	let title = ' Fat Fuzzy Dev'
	let description = 'Fat Fuzzy Dev: how to use the packages in this project to develop other apps'
	$: path = ''
	$: items = [
		{
			slug: 'dev',
			title: 'Dev',
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
