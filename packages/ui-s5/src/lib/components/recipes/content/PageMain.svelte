<script lang="ts">
	import type {Snippet} from 'svelte'
	import Head from '$lib/components/blocks/global/Head.svelte'

	type Props = {
		title: string
		description: string
		page?: string
		size?: string
		header?: Snippet
		children: Snippet
	}

	let {
		title = 'SidebarPage',
		description = `Sidebar page layout`,
		page,
		size,
		header,
		children,
	}: Props = $props()

	let currentPage = $state(page ?? title)
	let headerClass = $derived(`l:sidebar:${size} align:center maki:block:lg`)
</script>

<Head page={currentPage} {title} {description} />

<header class={headerClass}>
	{#if header}
		{@render header()}
	{:else}
		<h1 class="maki:block:md">{title}</h1>
	{/if}
</header>

<section class="scroll:y">
	{#if children}
		{@render children()}
	{/if}
</section>
