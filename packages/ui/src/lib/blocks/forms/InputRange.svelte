<script lang="ts">
	import {createEventDispatcher} from 'svelte'

	const dispatch = createEventDispatcher()

	// @ts-check
	export let id = ''
	export let label = 'Range'
	export let value = 0
	export let min = 0
	export let max = 100
	export let step = '1'
	export let color = ''
	export let variant = ''
	export let layout = ''
	export let breakpoint = ''
	export let size = ''
	export let align = ''

	const handleInput = () => {
		dispatch('input', {
			value,
		})
	}

	$: inputId = `range-${id}`
	$: classes = `l:${layout}:${size} bp:${breakpoint} ${color} ${variant} ${align}`
</script>

<label for={inputId} class={classes}>
	<span class={`font:${size}`}>
		{label}:
		{value}
	</span>
	<input
		{id}
		data-test={`${id}-range`}
		type="range"
		bind:value
		{min}
		{max}
		{step}
		on:input={handleInput}
	/>
</label>
