<script lang="ts">
	import {browser} from '$app/environment'
	import {createEventDispatcher} from 'svelte'
	import {clickOutside} from '../../utils/click-outside.js'
	import format from '../../utils/format'
	import Button from './Button.svelte'
	import mocks from '../../../data/mocks'

	const dispatch = createEventDispatcher()
	export let layout = 'stack'
	export let size = ''
	export let breakpoint = ''
	export let variant = ''
	export let color = ''
	export let id = 'reveal-menu'
	export let title = ''
	export let asset = ''
	export let align = 'start'
	export let items = mocks.menu.map((button) => ({...button, id: `${id}.${button.id}`}))

	let expanded = false

	const toggleReveal = (event) => {
		expanded = !expanded
	}

	const handleClickOutside = (event) => {
		expanded = false
	}

	let clicked = ''
	let innerVariant = ''

	export let onClick = (event) => {
		if (browser) {
			window.alert(`${event.target.textContent} Clicked`)
		}
		clicked = event.target.id
		dispatch('click', {
			clicked,
		})
	}
	const VARIANT_MATCH: {[key: string]: string} = {
		outline: 'bare',
		bare: 'outline',
		default: 'outline',
	}
	$: show = expanded ? 'show card:lg layer' : 'hide'
	$: innerVariant = VARIANT_MATCH[variant]
</script>

<div
	class={`l:reveal l:${layout} ${size} bp:${breakpoint}`}
	use:clickOutside
	on:clickOutside={handleClickOutside}
>
	<button
		type="button"
		class={`toggle collapse  ${size} ${variant} ${color}`}
		aria-expanded={expanded}
		aria-haspopup="menu"
		aria-controls={id}
		on:click={toggleReveal}
	>
		{format.formatLabel(title, asset)}
	</button>
	<menu {id} class={`l:${layout} ${size} align:${align} ${show}`}>
		{#each items as buttonProps}
			<li>
				<Button {onClick} {...buttonProps} variant={innerVariant} {color} />
			</li>
		{/each}
	</menu>
</div>
