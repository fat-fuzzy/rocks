<script lang="ts">
	import constants from '$lib/types/constants.js'
	import type {RevealNavProps} from './nav.types.js'
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
		direction = 'tb-lr',
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

	let navContainer = container ? `${container}:${size}` : ''
	let navLayoutThreshold = breakpoint
		? `bp:${breakpoint}`
		: threshold
			? `th:${threshold}`
			: ''
	let navLayout = layout ? `l:${layout}:${size} ${navLayoutThreshold}` : ''
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

<nav id={`nav-${id}`} class={layoutClasses} aria-label={title}>
	<SkipLinks text="Skip to content" href="#content" />
	<Reveal
		{id}
		{variant}
		{title}
		{size}
		{color}
		reveal={sidebarReveal.reveal}
		{actionPath}
		{formaction}
		{redirect}
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
		/>
	</Reveal>
</nav>
