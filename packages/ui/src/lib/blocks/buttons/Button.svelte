<script lang="ts">
	// Inputs
	import {browser} from '$app/environment'
	import format from '../../utils/format'
	import fixtures from '../../../data/fixtures'

	export let id = ''
	export let disabled = false
	export let color = ''
	export let variant = ''
	export let layout = 'switcher'
	export let breakpoint = ''
	export let size = ''
	export let align = ''
	export let asset = fixtures.button.emoji
	export let text = fixtures.button.text
	// Event Handlers

	export let onClick = (event) => {
		if (browser) {
			window.alert(`${text} Clicked`)
		}
	}

	$: buttonId = `btn-${id}`
	$: classes = `l:${layout} bp:${breakpoint} ${size} ${color} ${variant} ${align}`
</script>

<button {id} data-test={buttonId} on:click={onClick} class={classes} {disabled}>
	<slot>{format.formatLabel(text, asset)}</slot>
</button>
