<script lang="ts">
	import {page} from '$app/stores'
	import {recipes, layouts, headless} from '@fat-fuzzy/ui-s5'

	const {Head} = headless
	const {Sidebar} = layouts
	const {Nav} = recipes

	let title = ' FatFuzzy Log'
	let description =
		'Fat Fuzzy Log: thoughts and choices that provide context for this project'
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

<Head page={title} {description} />

<Sidebar size="xs">
	<svelte:fragment slot="side">
		<Nav {items} {path} background="polar" size="md" color="primary" />
	</svelte:fragment>
	<div slot="main" class="l:center l:stack:xxl">
		<slot />
	</div>
</Sidebar>
