<script lang="ts">
	import {clickOutside} from '$lib/utils/click-outside.js'
	import {createEventDispatcher} from 'svelte'
	import format from '$lib/utils/format'
	import Button from '$lib/components/blocks/buttons/Button.svelte'

	const dispatch = createEventDispatcher()
	export let layout = 'stack'
	export let container = 'card'
	export let direction = 'tb-lr'
	export let size = ''
	export let threshold = ''
	export let variant = ''
	export let height = ''
	export let color = ''
	export let background = ''
	export let id = 'reveal-menu'
	export let title = ''
	export let icon = ''
	export let align = 'start'
	export let place = 'left'
	export let items: any = []

	let expanded = false

	function handleClickOutside(event) {
		// expanded = false
		// TODO : fix this
	}

	function toggleReveal(event) {
		expanded = !expanded
	}

	let clicked = ''
	let innerVariant = ''

	// Override this function to override menu button actions
	export let onClick = (event) => {
		window.alert(`${event.target.textContent} Clicked`)
		clicked = event.target.id
		dispatch('click', {
			clicked,
		})
	}
	const VARIANT_MATCH: {[key: string]: string} = {
		outline: 'bare',
		bare: 'bare',
		default: 'outline',
	}
	$: show = expanded ? `show ${place}` : `minimize ${place}`
	$: setHeight = height ? ` h:${height}` : ''
	$: innerVariant = VARIANT_MATCH[variant]
</script>

<div
	class={`l:reveal ${show} ${setHeight} l:${layout} ${direction}`}
	use:clickOutside
	on:clickOutside={handleClickOutside}
>
	<button
		id={`${id}-reveal-menu-button`}
		class={`card:${size} ${variant} ${color} font:sm`}
		aria-expanded={expanded}
		aria-controls={`${id}-reveal-menu`}
		on:click={toggleReveal}
	>
		<span class="icon">{icon}</span>
		<span class="text">{format.formatLabel(title, icon)}</span>
	</button>
	<menu
		id={`menu-${id}`}
		class={`content l:${layout}:${size} ${container}:${size} th:${threshold} layer bg:${background} card:${size} align:${align} ${size}`}
	>
		{#each items as buttonProps}
			<li>
				<Button {onClick} {...buttonProps} variant={innerVariant} {color} />
			</li>
		{/each}
	</menu>
</div>
