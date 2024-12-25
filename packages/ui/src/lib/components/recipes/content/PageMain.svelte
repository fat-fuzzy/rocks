<script lang="ts">
	import type {Snippet} from 'svelte'
	import Head from '$lib/components/blocks/global/Head.svelte'

	type Props = {
		id?: string
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
		id = 'main',
		title = 'PageMain',
		description = `Basic page layout`,
		pageName,
		size,
		layout = 'sidebar',
		justify,
		header,
		children,
	}: Props = $props()

	let currentPage = $state(pageName ?? title)
	let justifyClass = $derived(justify ? `justify:${justify}` : '')
	let layoutClass = $derived(size ? `l:${layout}:${size}` : `l:${layout}`)
	let headerClass = $derived(
		`${layoutClass} ${justifyClass} align:baseline maki:block:lg`,
	)
</script>

<Head pageName={currentPage} {title} {description} />

<main {id}>
	<header class={headerClass}>
		{#if header}
			{@render header()}
		{:else}
			<h1 class="maki:block:md">{title}</h1>
		{/if}
	</header>

	{#if children}
		{@render children()}
	{/if}
</main>
