<script lang="ts">
	import type {Snippet} from 'svelte'
	import Head from '$lib/components/blocks/global/Head.svelte'

	type Props = {
		title: string
		description: string
		page?: string
		header?: Snippet
		children: Snippet
	}

	let {
		title = 'SidebarPage',
		description = `Sidebar page layout`,
		page,
		header,
		children,
	} = $props() as Props

	let currentPage = $derived(page ?? title)
	let headerClass = 'l:flex bg:polar align:center maki:block'
</script>

<Head page={currentPage} {title} {description} />

<header class={headerClass}>
	{#if header}
		{@render header()}
	{:else}
		<h1 class="card:md">{title}</h1>
	{/if}
</header>

<section class="card:md scroll:y l:center">
	{#if children}
		{@render children()}
	{/if}
</section>
