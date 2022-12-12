<script lang="ts">
	import { page } from '$app/stores';
	import type { ComponentType } from 'svelte';
	import { stories } from '@fat-fuzzy/ui';
	const { Story } = stories;

	let title: string;
	let category: string;
	let Component: ComponentType;
	$: title = $page.data.title;
	$: slug = $page.data.slug;
	$: category = $page.data.category;
	$: Component = $page.data.Component;
</script>

<Story
	{title}
	{slug}
	componentProps={{ size: 'lg', theme: 'dark', variant: 'primary' }}
	storyProps={{
		icons: [],
		sizes: ['sm', 'md'],
		variants: ['outline', 'primary'],
		themes: ['light', 'dark']
	}}
	component={Component}
/>
