<script lang="ts">
	import type {HeaderProps} from '$types'
	import styleHelper from '$lib/utils/styles.js'
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
		threshold,
		layout = 'switcher',
		asset,
		justify = 'evenly',
		dismiss = 'outside',
		auto,
		title,
		path,
		reveal,
		actionPath,
		formaction,
		redirect,
		links,
	}: HeaderProps = $props()

	let revealState = $derived(reveal)
	let linkListClasses = $derived(
		styleHelper.getStyles({
			color,
			size,
			layout,
			threshold,
			align: 'center',
			justify: 'between',
			background: 'inherit',
		}),
	)
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
	{reveal}
	{breakpoint}
	{formaction}
	{actionPath}
	{redirect}
>
	<ul class={`header-nav unstyled w:full ${linkListClasses}`}>
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
