<script lang="ts">
	import type {Snippet} from 'svelte'
	import Head from '$lib/components/blocks/global/Head.svelte'

	type Props = {
		title: string
		description: string
		page?: string
		size?: string
		header?: Snippet
		justify?: string
		children: Snippet
	}

	let {
		title = 'PageMain',
		description = `Basic page layout`,
		page,
		size,
		justify,
		header,
		children,
	}: Props = $props()

	let currentPage = $state(page ?? title)
	let justifyClass = $derived(justify ? `justify:${justify}` : '')
	let layoutClass= $derived(size ? `l:sidebar:${size}` : `l:sidebar`)
	let headerClass = $derived(`${layoutClass} ${justifyClass} maki:block:lg`)
</script>

<Head page={currentPage} {title} {description} />

<header id="content" class={headerClass}>
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
