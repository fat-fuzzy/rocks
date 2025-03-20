<script lang="ts">
	import type {RevealNavProps} from '$types'
	import {DismissEvent} from '$types'
	import styleHelper from '$lib/utils/styles.js'
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
		font,
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
	let revealClasses = $derived(`l:reveal ${place} ${reveal} ${layoutClasses}`)
</script>

<nav
	id={`nav-${id}`}
	class={revealClasses}
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
		{font}
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
