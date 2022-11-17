<script>
	import {createEventDispatcher} from 'svelte'

	const dispatch = createEventDispatcher()

	// @ts-check
	export let label = ''
	export let value = 0
	export let min = 0
	export let max = 0
	export let step = '1'

	const handleInput = () => {
		dispatch('input', {
			value,
		})
	}

	$: id = `${label.replaceAll(' ', '-')}-range`
</script>

<label for={id}>
	{label}:
	{value}
</label>
<input
	{id}
	data-test={`${label}-range`}
	type="range"
	bind:value
	{min}
	{max}
	{step}
	on:input={handleInput}
/>
