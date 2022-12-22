<script lang="ts">
	import { page } from '$app/stores';
	import { blocks, layouts, stories } from '@fat-fuzzy/ui';
	import type { ComponentType } from 'svelte';

	const { Story } = stories;
	const selected = { size: 'md', variant: 'primary' };
	let title: string;
	let components: { [key: string]: ComponentType };
	$: title = $page.data.title;
	$: components = $page.data.slug === 'blocks' ? blocks : layouts; // TODO: try dynamic import
	$: keys = Object.keys(components);
</script>

<h1>{title}</h1>
{#each keys as key}
	{@const Component = components[key]}
	<Story title={key} slug={key.toLowerCase()} component={Component} {selected} />
{/each}
