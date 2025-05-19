<script lang="ts">
	import type {RevealNavProps} from '$types'
	import {DismissEvent} from '$types'
	import styleHelper from '$lib/utils/styles.js'
	import Reveal from '$lib/components/layouts/reveal/Reveal.svelte'
	import SkipLinks from '$lib/components/recipes/navs/SkipLinks.svelte'
	import LinkTree from '$lib/components/recipes/navs/LinkTree.svelte'

	let {
		id = 'reveal-nav',
		title = 'RevealNav',
		label = 'RevealNav',
		path = '',
		asset,
		reveal,
		formaction,
		actionPath,
		redirect,
		preload,
		layout,
		scroll,
		layer,
		dismiss = DismissEvent.outside,
		color,
		size,
		font,
		breakpoint,
		threshold,
		variant,
		align,
		justify,
		area,
		width,
		height,
		place = 'top',
		position,
		container,
		background,
		items = [],
		onclick,
	}: RevealNavProps = $props()

	let layoutClasses = $derived(
		styleHelper.getStyles({
			position,
			size,
			justify,
			align,
			layout,
			breakpoint,
			threshold,
			background,
			container,
		}),
	)

	let widthClass = $derived(width ? `width:${width}` : '')
	let heightClass = $derived(area ? `height:${height}` : '')

	let revealClasses = $derived(
		area
			? `${area}:${place} ${reveal} ${widthClass} ${heightClass}`
			: `l:reveal ${place} ${reveal}`,
	)

	let navClasses = $derived(`${layoutClasses} ${revealClasses}`)
</script>

<nav
	id={`nav-${id}`}
	class={navClasses}
	aria-label={title}
	data-testid={`nav-${id}`}
>
	<SkipLinks text="Skip to content" href="#main" />
	<Reveal
		{id}
		name={id}
		{label}
		{variant}
		{title}
		{asset}
		{size}
		{font}
		{color}
		{reveal}
		{layer}
		{scroll}
		{dismiss}
		{formaction}
		{actionPath}
		{redirect}
		{position}
		{place}
		{align}
		{justify}
		{onclick}
	>
		<LinkTree
			id={`${id}-${path}`}
			{path}
			{items}
			{size}
			{align}
			depth={0}
			{preload}
		/>
	</Reveal>
</nav>
