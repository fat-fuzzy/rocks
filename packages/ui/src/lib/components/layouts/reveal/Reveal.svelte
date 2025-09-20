<script lang="ts">
	import type {RevealLayoutProps} from '$types'

	import {DismissEvent} from '$types'
	import constants from '$lib/types/constants.js'
	import styleHelper from '$lib/utils/styles.js'
	// import {clickOutside} from '$lib/utils/click-outside.js'
	import RevealForm from '$lib/components/layouts/reveal/RevealForm.svelte'
	import RevealContent from '$lib/components/layouts/reveal/RevealContent.svelte'

	const {DEFAULT_REVEAL_STATE} = constants

	let {
		id = 'Reveal',
		name = 'Reveal',
		title = 'Reveal',
		label = 'Reveal',
		auto = false,
		method = 'POST', // TODO: change to GET with params
		formaction,
		actionPath,
		redirect,
		layout,
		reveal = DEFAULT_REVEAL_STATE.reveal,
		place = 'top',
		element = 'div', // HTML tag or tag.class
		position,
		color,
		size,
		shape,
		font,
		breakpoint,
		// trigger = ButtonEvent.click,
		dismiss = DismissEvent.click,
		variant,
		align,
		justify,
		text,
		scroll,
		height,
		background,
		layer,
		asset,
		children,
	}: RevealLayoutProps = $props()

	let html = $state(element.split('.'))
	let {tag, className} = $derived.by(() => ({
		tag: html[0],
		className: html[1],
	}))

	let payload = $derived({
		state: reveal,
		id: `button-reveal-${id}`,
	})

	let layoutClasses = $derived.by(() =>
		styleHelper.getLayoutStyles({
			height,
			align,
			justify,
			layout,
			position,
			breakpoint,
			background,
			layer,
		}),
	)

	let expanded = $derived(payload.state)
	let layoutSize = $derived(size ? `size:${size}` : '')
	let revealLayoutClasses = $derived(
		`${expanded} ${layoutClasses} ${layoutSize}`,
	)
	let revealClasses = $derived(
		auto
			? `${className} l:reveal:auto ${revealLayoutClasses}`
			: `${className} l:reveal ${revealLayoutClasses}`,
	)

	function onKeyUp(e: KeyboardEvent) {
		if (e.key === 'Escape' && payload.state === 'expanded') {
			return
		}
		payload.state = 'collapsed'
	}
</script>

<svelte:window onkeyup={onKeyUp} />

{#if auto}
	<svelte:element
		this={tag}
		id={`reveal-${id}`}
		class={revealClasses}
		aria-label={tag === 'menu' ? (label ?? title) : undefined}
	>
		{@render revealForm()}
	</svelte:element>
{:else}
	{@render revealForm()}
{/if}

{#snippet revealForm()}
	<RevealForm
		{id}
		{label}
		{name}
		{method}
		{actionPath}
		{formaction}
		{redirect}
		{reveal}
		{asset}
		{color}
		{size}
		{shape}
		{font}
		{variant}
		{align}
		{justify}
		{text}
	/>

	<RevealContent
		id={`${id}-reveal-content`}
		{place}
		{reveal}
		{scroll}
		{layer}
		{background}
	>
		{#if children}
			{@render children()}
		{/if}
	</RevealContent>
{/snippet}
