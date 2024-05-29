<script lang="ts">
	import {headless} from '@fat-fuzzy/ui-s5'
	import type {Snippet} from 'svelte'

	const {Head} = headless

	type Props = {
		title: string
		description: string
		children: Snippet
	}

	let {
		title = 'SidebarPage',
		description = `Sidebar page layout`,
		children,
	} = $props() as Props

	let headerClass = 'l:flex bg:polar align:center maki:block'
</script>

<Head page={title} {description} />

<header class={headerClass}>
	<h1 class="card:md">{title}</h1>
</header>

<section class="card:md scroll:y l:center">
	{#if children}
		{@render children()}
	{/if}
</section>
