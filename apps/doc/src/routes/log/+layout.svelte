<script lang="ts">
	import {page} from '$app/stores'
	import {recipes, layouts, headless} from '@fat-fuzzy/ui-s5'

	const {Head} = headless
	const {Sidebar} = layouts
	const {Nav} = recipes

	let {children} = $props()
	let title = ' FatFuzzy Log'
	let description =
		'Fat Fuzzy Log: thoughts and choices that provide context for this project'
	let path = ''
	let items = [
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

<Sidebar size="md">
	{#snippet side()}
		<Nav id='nav-log' title='nav-log' {items} {path} background="polar" size="md" color="primary" />
	{/snippet}
	{#snippet main()}
		<div class="l:center l:stack:xxl">
			{#if children}
				{@render children()}
			{:else}
				<p class="feedback bare emoji:default">Doc Coming Soon!</p>
			{/if}
		</div>
	{/snippet}
</Sidebar>
