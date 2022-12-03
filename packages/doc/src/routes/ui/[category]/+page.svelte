<script lang="ts">
	import { page } from '$app/stores';
	import { blocks, layouts } from '@fat-fuzzy/ui';
	import type { ComponentType } from 'svelte';

	const { Story } = blocks;

	let title: string;
	let components: { [key: string]: ComponentType };
	$: title = $page.data.title;
	$: components = $page.data.slug === 'blocks' ? blocks : layouts; // TODO: try dynamic import
	$: keys = Object.keys(components);
</script>

<article>
	<h1>{title}</h1>
	{#each keys as key}
		{components}<br />
		{@const Component = components[key]}
		{Component}<br />
		<!-- <Story
			{title}
			slug=""
			componentProps={{ icon: '', size: 'md', theme: 'dark', variant: 'primary' }}
			storyProps={{
				icons: [],
				sizes: ['sm', 'md'],
				variants: ['outline', 'primary'],
				themes: ['light', 'dark']
			}}
			component={Component}
		/> -->
	{/each}
</article>
