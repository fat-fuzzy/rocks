<script lang="ts">
	// Inputs
	import {browser} from '$app/environment'
	import format from '../../utils/format'
	import mocks from '../../data/mocks'

	export let id = 'button'
	export let name = 'button'
	export let disabled = false
	export let color = ''
	export let variant = ''
	export let layout = 'switcher'
	export let breakpoint = ''
	export let size = ''
	export let align = ''
	export let asset = mocks.button.asset
	export let text = mocks.button.text
	export let formaction = 'enter'
	export let page = ''

	export let onClick = (event: MouseEvent) => {
		console.log(event)
		if (browser) {
			window.alert(`${text} Clicked`)
		}
	}
	$: variantClass = variant === 'default' ? '' : variant
	$: classes = `l:${layout} bp:${breakpoint} ${size} ${color} ${variantClass} ${align}`
</script>

<button
	{id}
	data-key={`${name}-${id}`}
	on:click|preventDefault={onClick}
	class={classes}
	{disabled}
	formaction={page ? `/${page}?/${formaction}` : `?/${formaction}`}
	value={id}
	{name}
>
	<slot>{format.formatLabel(text, asset)}</slot>
</button>
