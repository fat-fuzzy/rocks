<script lang="ts">
	import type {HeaderProps} from '$types'
	import Reveal from '$lib/components/layouts/Reveal.svelte'

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
	{actionPath}
	{redirect}
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
