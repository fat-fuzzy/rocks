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
		shape,
		color,
		background,
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
	{shape}
	{color}
	{font}
	{variant}
	{background}
	{asset}
	{justify}
	{dismiss}
	{auto}
	reveal={reveal ?? 'collapsed'}
	{breakpoint}
	{formaction}
	{actionPath}
	{redirect}
>
	<ul
		class="header-nav l:switcher:2xs size:md unstyled color:primary align:center justify:evenly w:full bg:inherit"
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
