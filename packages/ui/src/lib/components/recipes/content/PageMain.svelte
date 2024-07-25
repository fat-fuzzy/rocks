<script lang="ts">
	import type {Snippet} from 'svelte'
	import Head from '$lib/components/blocks/global/Head.svelte'

	type Props = {
		title: string
		description: string
		pageName?: string
		size?: string
		header?: Snippet
		layout?: string
		justify?: string
		children: Snippet
	}

	let {
		title = 'PageMain',
		description = `Basic page layout`,
		pageName,
		size,
		layout='sidebar',
		justify,
		header,
		children,
	}: Props = $props()

	let currentPage = $state(pageName ?? title)
	let justifyClass = $derived(justify ? `justify:${justify}` : '')
	let layoutClass= $derived(size ? `l:${layout}:${size}` : `l:${layout}`)
	let headerClass = $derived(`${layoutClass} ${justifyClass} maki:block:lg`)
</script>

<Head pageName={currentPage} {title} {description} />

<header id="content" class={headerClass}>
	{#if header}
		{@render header()}
	{:else}
		<h1 class="maki:block:md">{title}</h1>
	{/if}
</header>

<section>
	{#if children}
		{@render children()}
	{/if}
</section>
