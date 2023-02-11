<script lang="ts">
	// Inputs
	import {browser} from '$app/environment'
	import format from '../../utils/format'
	import mocks from '../../../data/mocks'

	export let id = ''
	export let disabled = false
	export let color = ''
	export let variant = ''
	export let layout = 'switcher'
	export let breakpoint = ''
	export let size = ''
	export let align = ''
	export let asset = mocks.button.emoji
	export let text = mocks.button.text
	export let onClick = (event: MouseEvent) => {
		console.log(event)
		if (browser) {
			window.alert(`${text} Clicked`)
		}
	}

	$: buttonId = `btn-${id}`
	$: classes = `l:${layout} bp:${breakpoint} ${size} ${color} ${variant} ${align}`
</script>

<button {id} data-test={buttonId} on:click|preventDefault={onClick} class={classes} {disabled}>
	<slot>{format.formatLabel(text, asset)}</slot>
</button>
