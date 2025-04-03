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
		element = 'div',
		position,
		color,
		size,
		font,
		breakpoint,
		// trigger = ButtonEvent.click,
		dismiss = DismissEvent.click,
		variant,
		align,
		justify,
		scroll,
		height,
		background,
		layer,
		asset,
		children,
	}: RevealLayoutProps = $props()

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
	let revealLayoutClasses = $derived(`${expanded} ${layoutClasses}`)
	let revealClasses = $derived(
		auto
			? `l:reveal:auto ${revealLayoutClasses}`
			: `l:reveal ${revealLayoutClasses}`,
	)

	function onKeyUp(e: KeyboardEvent) {
		if (e.key === 'Escape' && payload.state === 'expanded') {
			return
		}
		payload.state = 'collapsed'
	}

	// function handleClickOutside(e: MouseEvent) {
	// 	const target = e.target as HTMLElement
	// 	if (
	// 		dismiss !== DismissEvent.outside ||
	// 		payload.state !== 'expanded' ||
	// 		target.id !== `${id}-reveal`
	// 	) {
	// 		return
	// 	}
	// 	payload.state = 'collapsed' // TODO: Fix this does nothing
	// }
</script>

<svelte:window onkeyup={onKeyUp} />

{#if auto}
	<svelte:element
		this={element}
		{id}
		class={revealClasses}
		aria-label={label ?? title}
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
		{font}
		{variant}
		{align}
		{justify}
	/>

	<RevealContent {id} {place} {reveal} {scroll}>
		{#if children}
			{@render children()}
		{/if}
	</RevealContent>
{/snippet}
