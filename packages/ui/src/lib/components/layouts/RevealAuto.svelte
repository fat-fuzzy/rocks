<script lang="ts">
	import {createEventDispatcher} from 'svelte'
	import {enhance} from '$app/forms'

	import {clickOutside} from '$lib/utils/click-outside.js'
	import constants from '$lib/types/constants'

	import Expand from '$lib/components/blocks/buttons/Expand.svelte'

	const dispatch = createEventDispatcher()
	const {ALIGN_OPPOSITE} = constants

	export let layout = ''
	export let direction = ''
	export let color = ''
	export let size = ''
	export let breakpoint = ''
	export let variant = ''
	export let align = ''
	export let id = 'ui'
	export let background = ''
	export let title = 'Reveal'
	export let name = 'reveal'
	export let reveal = 'minimize'
	export let path = ''
	export let method = 'POST'
	export let formaction: string | undefined = undefined
	export let actionPath: string | undefined = undefined

	function handleClickOutside() {
		dispatch('toggle', {reveal: 'minimize'})
	}

	function handleToggle(event: CustomEvent) {
		const updated = event.detail.expanded ? 'show' : 'minimize'
		dispatch('toggle', {reveal: updated})
	}

	$: buttonAlign = align ? ALIGN_OPPOSITE[align] : ''
	$: showBackground = background ? `bg:${background}` : 'bg:inherit'
	$: show = `show ${showBackground}`
	$: showContent = reveal === 'show' ? show : 'hide:viz-only'
	$: revealClasses = `form:expand align-self:${buttonAlign}`
	$: layoutClass = layout ? `l:${layout}:${size}` : ''
	$: layoutClasses = `${layoutClass} l:reveal:auto bp:${breakpoint} ${size} align:${align}`
</script>

<div class={layoutClasses} use:clickOutside on:clickOutside={handleClickOutside}>
	<form
		{name}
		{method}
		action={actionPath && formaction
			? `/${actionPath}?/${formaction}&redirectTo=${path}`
			: `?/${formaction}&redirectTo=${path}`}
		use:enhance={() => {
			// prevent default callback from resetting the form
			return ({update}) => {
				update({reset: false})
			}
		}}
		class={revealClasses}
	>
		<Expand
			id={`${id}-expand-button`}
			{variant}
			{size}
			{color}
			{title}
			type={actionPath && formaction ? 'submit' : 'button'}
			name="reveal"
			controls={`reveal-${id}`}
			value={'menu'}
			states={{
				active: {text: 'Context', value: 'show', asset: 'emoji:context'},
				inactive: {text: 'Context', value: 'minimize', asset: 'emoji:context'},
			}}
			on:click={handleToggle}
		>
			{title}
		</Expand>
	</form>
	<div id={`reveal-${id}`} class={`${layoutClass} ${showContent} ${direction} shrink`}>
		<slot name="content">
			<div class={`layer card:${size}`}>
				<p class="font:lg">Revealed Content</p>
				<p>This is a card with some content</p>
			</div>
		</slot>
	</div>
</div>
