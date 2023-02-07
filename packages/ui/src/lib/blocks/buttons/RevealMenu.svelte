<script lang="ts">
	import {browser} from '$app/environment'
	import {createEventDispatcher} from 'svelte'
	import {clickOutside} from '../../utils/click-outside.js'
	import format from '../../utils/format'
	import Button from './Button.svelte'
	import fixtures from '../../../data/fixtures'

	const dispatch = createEventDispatcher()
	export let layout = 'stack'
	export let size = ''
	export let breakpoint = ''
	export let variant = ''
	export let color = ''
	export let id = 'reveal-menu'
	export let title = 'RevealMenu'
	export let asset = ''
	export let align = 'start'
	export let items: {
		id: string
		label: string
		type: string
		asset?: string
		variant?: string
		disabled?: boolean
	}[] = fixtures.menu

	let expanded = false

	const toggleReveal = (event) => {
		expanded = !expanded
	}

	const handleClickOutside = (event) => {
		expanded = false
	}

	let clicked = ''

	export let onClick = (event) => {
		if (browser) {
			window.alert(`${event.target.textContent} Clicked`)
		}
		clicked = event.target.id
		dispatch('click', {
			clicked,
		})
	}

	$: show = expanded ? 'show card:lg layer' : 'hide'
</script>

<menu
	aria-labelledby={id}
	class={`l:reveal l:${layout} ${size} bp:${breakpoint}`}
	use:clickOutside
	on:clickOutside={handleClickOutside}
>
	<button
		type="button"
		class={`toggle collapse  ${size} ${variant} ${color}`}
		aria-expanded={expanded}
		on:click={toggleReveal}
	>
		{format.formatLabel(title, asset)}
	</button>
	<div class={`${align} ${show}`}>
		<menu class={`l:${layout} ${size}`}>
			{#each items as buttonProps}
				<li>
					<Button {onClick} {...buttonProps} />
				</li>
			{/each}
		</menu>
	</div>
</menu>
