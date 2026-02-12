<script lang="ts">
	import type {RevealLayoutProps} from '$types'

	import constants from '$lib/types/constants.js'
	import styleHelper from '$lib/utils/styles.js'
	import system from '$lib/components/layouts/reveal/system.svelte'
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

	let html = $derived(element.split('.'))
	let {tag, className} = $derived.by(() => ({
		tag: html[0],
		className: html[1],
	}))

	const controlId = $derived(system.getControlId(id))
	const contentId = $derived(system.getContentId(id))

	let payload = $derived.by(() => {
		return {
			value: reveal,
			id: controlId,
			name: controlId,
		}
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

	let layoutSize = $derived(size ? `size:${size}` : '')
	let revealLayoutClasses = $derived(
		`${payload.value} ${layoutClasses} ${layoutSize}`,
	)
	let revealClasses = $derived(
		auto
			? `${className} l:reveal:auto ${revealLayoutClasses}`
			: `${className} l:reveal ${revealLayoutClasses}`,
	)

	function collapseReveal() {
		system.update({...payload, value: 'collapsed'})
	}

	function onKeyUp(e: KeyboardEvent) {
		if (e.key !== 'Escape') {
			return
		}
		system.update({...payload, value: 'collapsed'})
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
	/>

	<RevealContent
		id={contentId}
		name={contentId}
		label=""
		{place}
		{reveal}
		{scroll}
		{layer}
		{background}
		onclickoutside={collapseReveal}
	>
		{#if children}
			{@render children()}
		{/if}
	</RevealContent>
{/snippet}
