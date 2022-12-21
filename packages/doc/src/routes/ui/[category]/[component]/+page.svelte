<script lang="ts">
	import { page } from '$app/stores';
	import type { ComponentType } from 'svelte';
	import { stories } from '@fat-fuzzy/ui';
	const { Story } = stories;

	let title: string;
	let Component: ComponentType;
	$: title = $page.data.title;
	$: slug = $page.data.slug;
	$: Component = $page.data.Component;
</script>

<Story
	{title}
	{slug}
	showOptions={true}
	component={Component}
	selected={{ icon: '', size: 'md', theme: 'dark', variant: 'primary' }}
/>
