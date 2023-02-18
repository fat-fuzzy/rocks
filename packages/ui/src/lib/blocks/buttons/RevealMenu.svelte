<script lang="ts">
	import {browser} from '$app/environment'
	import {createEventDispatcher} from 'svelte'
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

<details aria-labelledby={id} class={`l:reveal l:${layout} bp:${breakpoint} ${size}`} open>
	<summary
		{id}
		class={`card:${size} ${variant} bg:${color}`}
		aria-expanded={expanded}
		aria-haspopup="menu"
		aria-controls={`menu-${id}`}
		on:click={toggleReveal}
	>
		{format.formatLabel(title, asset)}
	</summary>
	<menu id={`menu-${id}`} class={`l:${layout} bp:${breakpoint} ${size} align:${align} ${show}`}>
		{#each items as buttonProps}
			<li>
				<Button {onClick} {...buttonProps} variant={innerVariant} {color} />
			</li>
		{/each}
	</menu>
</details>
