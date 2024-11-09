<script lang="ts">
	import type {Snippet} from 'svelte'
	import type {ScrollyItemProps} from '$types'
	import Head from '$lib/components/blocks/global/Head.svelte'
	import Scrolly from '$lib/components/recipes/animations/scroll/Scrolly.svelte'

	type Props = {
		title: string
		description: string
		pageName?: string
		size?: string
		header?: Snippet
		layout?: string
		justify?: string
		fixed?: boolean
		dimensions?: string
		animations?: string[]
		items: ScrollyItemProps[]
	}

	let {
		title = 'PageMain',
		description = `Basic page layout`,
		pageName,
		size,
		layout = 'sidebar',
		justify,
		header,
		fixed = false,
		animations = ['fade'],
		items,
	}: Props = $props()

	let currentPage = $state(pageName ?? title)
	let justifyClass = $derived(justify ? `justify:${justify}` : '')
	let layoutClass = $derived(size ? `l:${layout}:${size}` : `l:${layout}`)
	let headerClass = $derived(
		`${layoutClass} ${justifyClass} align:baseline maki:block:lg`,
	)
</script>

<Head pageName={currentPage} {title} {description} />

<header id="content" class={headerClass}>
	{#if header}
		{@render header()}
	{:else}
		<h1 class="maki:block:md">{title}</h1>
	{/if}
</header>

<Scrolly {animations} {fixed} {items} level={0} />
