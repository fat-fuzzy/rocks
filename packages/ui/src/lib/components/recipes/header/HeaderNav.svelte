<script lang="ts">
	import type {HeaderProps} from '$types'
	import Reveal from '$lib/components/layouts/reveal/Reveal.svelte'

	let {
		id = 'ui-header-nav-app',
		label,
		breakpoint = 'xs',
		size,
		font,
		variant,
		asset,
		justify,
		dismiss,
		auto,
		title,
		path,
		reveal,
		actionPath,
		formaction,
		redirect,
		links,
	}: HeaderProps = $props()
</script>

<Reveal
	{id}
	name={id}
	{label}
	element="nav"
	{title}
	{size}
	{font}
	{variant}
	{asset}
	{justify}
	{dismiss}
	{auto}
	{reveal}
	{breakpoint}
	{formaction}
	{actionPath}
	{redirect}
>
	<ul
		class="header-nav l:flex size:md unstyled color:primary align:center justify:evenly w:full"
	>
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
