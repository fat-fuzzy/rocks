<script lang="ts">
	import type {Snippet} from 'svelte'
	import {clickOutside} from '$lib/utils/click-outside.js'
	import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'

	type Props = {
		id: string
		title?: string
		method?: string
		formaction?: string
		actionPath?: string
		redirect?: string
		layout?: string
		direction?: string
		color?: string
		size?: string
		breakpoint?: string
		variant?: string
		align?: string
		height?: string
		background?: string
		asset?: string
		content?: Snippet
	}

	let {
		id = 'ui',
		title = 'Reveal',
		method = 'POST',
		formaction,
		actionPath,
		redirect,
		layout,
		direction = 'tb-lr',
		color,
		size,
		breakpoint,
		variant,
		align,
		height,
		background,
		asset,
		content,
	}: Props = $props()

	let expanded = false

	function handleClickOutside(event) {
		expanded = false
	}

	function toggleReveal(event) {
		expanded = !expanded
	}

	let backgroundClass = background ? `layer bg:${background}` : 'hide:viz-only'
	let show = expanded ? `${backgroundClass} show` : 'hide:viz-only'
	let setHeight = height ? ` h:${height}` : ''

	// TODO: use a form
	let action = formaction
		? redirect
			? `${formaction}&redirectTo=${redirect}`
			: formaction
		: undefined
</script>

<div
	class={`l:reveal ${setHeight} l:${layout} bp:${breakpoint} ${size} ${direction}`}
	use:clickOutside
	on:clickOutside={handleClickOutside}
>
	<Expand
		id={`button-reveal-${id}`}
		{title}
		{color}
		{variant}
		{size}
		type={actionPath && formaction ? 'submit' : 'button'}
		name="reveal"
		controls={`${id}-reveal`}
		value={'menu'}
		states={{
			active: {text: 'Reveal', value: 'show', asset},
			inactive: {text: 'Reveal', value: 'minimize', asset},
		}}
		on:click={toggleReveal}
	>
		{title}
	</Expand>
	<div id={`${id}-reveal`} class={`align:${align} ${show}`}>
		{#if content}
			{@render content()}
			{:else}
			<div class={`card:lg`}>
				<h3>Revealed Content</h3>
				<p>This is a card with some content</p>
			</div>
		{/if}
	</div>
</div>
