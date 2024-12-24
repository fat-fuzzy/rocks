<script lang="ts">
	import type {HeaderProps} from '$types'
	import constants from '$lib/types/constants.js'
	import Reveal from '$lib/components/layouts/Reveal.svelte'

	const {DEFAULT_REVEAL_STATE} = constants

	let {
		id = 'ui-header-nav-app',
		breakpoint = 'sm',
		size,
		variant,
		asset,
		justify,
		dismiss,
		auto,
		title,
		path,
		formaction,
		links,
	}: HeaderProps = $props()

	let navReveal = $state(DEFAULT_REVEAL_STATE)
	let reveal = $derived(navReveal.reveal)
</script>

<Reveal
	{id}
	name={id}
	label=""
	element="nav"
	{title}
	{size}
	{variant}
	{asset}
	{justify}
	{dismiss}
	{auto}
	{reveal}
	{breakpoint}
	{formaction}
>
	<ul class="l:switcher:sm unstyled color:primary">
		<li aria-current={path === '/' ? 'page' : undefined}>
			<a data-sveltekit-preload-data href="/">Home</a>
		</li>
		{#each links as { slug, title }}
			<li aria-current={path?.startsWith(`/${slug}`) ? 'page' : undefined}>
				<a data-sveltekit-preload-data href={`/${slug}`}>
					{title}
				</a>
			</li>
		{/each}
	</ul>
</Reveal>
