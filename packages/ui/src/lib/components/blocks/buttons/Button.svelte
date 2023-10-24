<script lang="ts">
	import format from '$lib/utils/format'
	type ButtonType = 'button' | 'submit' | 'reset' | null | undefined

	export let id = 'button'
	export let name = 'button'
	export let disabled = false
	export let color = ''
	export let variant = ''
	export let layout = 'switcher'
	export let breakpoint = ''
	export let size = ''
	export let align = ''
	export let asset = ''
	export let text = ''
	export let formaction = 'enter'
	export let page = ''
	export let type = 'button'

	export let onClick = (event: MouseEvent) => {
		window.alert(`${format.formatLabel(text, asset)} Clicked`)
	}

	$: variantClass = variant === 'default' ? '' : variant
	$: classes = `l:${layout} bp:${breakpoint} ${size} ${color} ${variantClass} ${align}`
</script>

<button
	{id}
	{type}
	data-key={`${name}-${id}`}
	on:click={onClick}
	class={classes}
	{disabled}
	formaction={page ? `/${page}?/${formaction}` : `?/${formaction}`}
	value={id}
	{name}
>
	<slot>{format.formatLabel(text, asset)}</slot>
</button>
