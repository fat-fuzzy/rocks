<script lang="ts">
	import {clickOutside} from '$lib/utils/click-outside.js'
	import Expand from '$lib/components/blocks/buttons/Expand.svelte'

	export let layout = ''
	export let direction = 'tb-lr'
	export let color = ''
	export let size = ''
	export let breakpoint = ''
	export let variant = ''
	export let align = ''
	export let id = 'ui'
	export let height = ''
	export let background = ''
	export let title = 'Reveal'
	export let asset = ''
	export let method = 'POST'
	export let formaction: string | undefined = undefined
	export let actionPath: string | undefined = undefined
	export let redirect: string | undefined = undefined

	let expanded = false

	function handleClickOutside(event) {
		expanded = false
	}

	function toggleReveal(event) {
		expanded = !expanded
	}

	$: backgroundClass = background ? `layer bg:${background}` : 'hide:viz-only'
	$: show = expanded ? `${backgroundClass} show` : 'hide:viz-only'
	$: setHeight = height ? ` h:${height}` : ''

	// TODO: use a form
	$: action = formaction
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
		<slot name="content">
			<div class={`card:lg`}>
				<h3>Revealed Content</h3>
				<p>This is a card with some content</p>
			</div>
		</slot>
	</div>
</div>
