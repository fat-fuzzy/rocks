<script lang="ts">
	import {page} from '$app/stores'
	import {recipes, layouts, headless} from '@fat-fuzzy/ui-s5'

	const {Head} = headless
	const {Sidebar} = layouts
	const {Nav} = recipes

	let {children} = $props()
	let title = ' Fat Fuzzy Dev'
	let description =
		'Fat Fuzzy Dev: how to use the packages in this project to develop other apps'
	let path = ''
	let items = [
		{
			slug: 'dev',
			title: 'Dev',
			items: $page.data.markdowns.map(({meta}) => ({
				id: meta.id,
				slug: meta.slug,
				title: meta.title,
			})),
		},
	]
</script>

<Head page={title} {description} />

<Sidebar size="xs">
	{#snippet side()}
		<Nav id='nav-dev' title='nav-dev' {items} {path} background="polar" size="md" color="primary" />
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
