<script lang="ts">
	import type {RevealNavProps} from '$types'
	import {DismissEvent} from '$types'
	import Reveal from '$lib/components/layouts/Reveal.svelte'
	import SkipLinks from '$lib/components/recipes/navs/SkipLinks.svelte'
	import LinkTree from '$lib/components/recipes/navs/LinkTree.svelte'

	let {
		id = 'reveal-nav',
		title = 'RevealNav',
		path = '',
		reveal,
		formaction,
		actionPath,
		redirect,
		preload,
		layout,
		dismiss = DismissEvent.outside,
		color,
		size,
		breakpoint,
		threshold,
		variant,
		align,
		justify,
		place = 'top',
		position,
		container,
		background,
		items = [],
		onclick,
	}: RevealNavProps = $props()

	let navContainer = $derived(container ? `${container}:${size}` : '')
	let navLayoutThreshold = $derived(
		breakpoint ? `bp:${breakpoint}` : threshold ? `th:${threshold}` : '',
	)
	let navLayout = $derived(
		layout ? `l:${layout}:${size} ${navLayoutThreshold}` : '',
	)
	let showBackground = $derived(background ? `bg:${background}` : '')
	let showSidebar = $derived(`${reveal} ${showBackground} ${place}`)
	let navClasses = $derived(
		`${navLayout} ${navContainer} ${showSidebar} align:${align} ${size} `,
	)
	let revealClasses = $derived(`l:reveal ${place} ${navClasses} ${reveal}`)
	let layoutClasses = $derived(
		position ? `${position} ${revealClasses}` : revealClasses,
	)
</script>

<nav
	id={`nav-${id}`}
	class={layoutClasses}
	aria-label={title}
	data-testid={`nav-${id}`}
>
	<SkipLinks text="Skip to content" href="#main" />
	<Reveal
		{id}
		name={id}
		label=""
		{variant}
		{title}
		{size}
		{color}
		{reveal}
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
