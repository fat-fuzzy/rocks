<script lang="ts">
	import type {RevealNavProps} from '$types'
	import {UiEvents} from '$types'
	import constants from '$lib/types/constants.js'
	import Reveal from '$lib/components/layouts/Reveal.svelte'
	import SkipLinks from '$lib/components/blocks/global/SkipLinks.svelte'
	import LinkList from '$lib/components/recipes/navs/LinkList.svelte'

	const {DEFAULT_NAV_REVEAL_STATE} = constants

	let {
		id = 'reveal-nav',
		title = 'RevealNav',
		path = '',
		reveal,
		formaction,
		actionPath,
		redirect,
		layout,
		dismiss = UiEvents.outside,
		color,
		size,
		breakpoint,
		threshold,
		variant,
		align = 'center',
		justify,
		place = 'top',
		position,
		container,
		background,
		items = [],
		onclick,
	}: RevealNavProps = $props()

	let sidebarReveal = $state(reveal ? {reveal} : DEFAULT_NAV_REVEAL_STATE)

	function toggleReveal(event) {
		sidebarReveal.reveal = event.state
		if (onclick) onclick(event)
	}

	let navContainer = $derived(container ? `${container}:${size}` : '')
	let navLayoutThreshold = $derived(
		breakpoint ? `bp:${breakpoint}` : threshold ? `th:${threshold}` : '',
	)
	let navLayout = $derived(
		layout ? `l:${layout}:${size} ${navLayoutThreshold}` : '',
	)
	let showBackground = $derived(background ? `bg:${background}` : '')
	let showSidebar = $derived(
		`${sidebarReveal.reveal} ${showBackground} ${place}`,
	)
	let navClasses = $derived(
		`${navLayout} ${navContainer} ${showSidebar} align:${align} ${size} `,
	)
	let revealClasses = $derived(
		`l:reveal ${place} ${navClasses} ${sidebarReveal.reveal}`,
	)
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
	<SkipLinks text="Skip to content" href="#content" />
	<Reveal
		{id}
		name={id}
		label=""
		{variant}
		{title}
		{size}
		{color}
		reveal={sidebarReveal.reveal}
		{dismiss}
		{formaction}
		{position}
		{place}
		{align}
		{justify}
		onclick={toggleReveal}
	>
		<LinkList
			id={`${id}-${path}`}
			{path}
			{items}
			{size}
			{align}
			container="content"
			depth={0}
			{redirect}
		/>
	</Reveal>
</nav>
