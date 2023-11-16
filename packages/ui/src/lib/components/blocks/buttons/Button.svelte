<script lang="ts">
	type ButtonType = 'button' | 'submit' | 'reset' | null | undefined
	import format from '$lib/utils/format'

	export let id = 'button'
	export let title = ''
	export let name = ''
	export let disabled = false
	export let color = ''
	export let variant = 'default'
	export let layout = 'switcher'
	export let breakpoint = ''
	export let size = ''
	export let align = ''
	export let asset = '' // emoji:value or svg:value
	export let text = ''
	export let formaction = 'enter'
	export let page = ''
	export let type: ButtonType = 'button'

	export let onClick = (event: MouseEvent) => {
		window.alert(`${format.formatLabel(text, asset)} Clicked`)
	}

	$: layoutClass =
		variant !== 'round' ? `l:${layout}:${size} bp:${breakpoint} ${variant}` : `${variant}`
	$: classes = `${layoutClass} ${color} ${asset} ${align} ${size} font${size}`
	$: formaction = page ? `/${page}?/${formaction}` : `?/${formaction}`
</script>

<button
	{id}
	{type}
	data-key={`${name}-${id}`}
	on:click={type !== 'submit' ? onClick : undefined}
	class={classes}
	{disabled}
	formaction={type === 'submit' ? formaction : undefined}
	value={id}
	name={id}
	{title}
>
	<slot>{text}</slot>
</button>
