<script lang="ts">
	import {createEventDispatcher} from 'svelte'

	import {blocks} from '@fat-fuzzy/ui-s5'
	const {InputRange} = blocks

	const dispatch = createEventDispatcher()

	export let color = ''

	export let size = 'xxs'
	export let id = 'camera'
	export let label = 'Camera'
	export let angle = 60
	export let min = -360
	export let max = 360
	export let step = 0.01
	export let disabled: boolean | undefined = undefined

	function update() {
		dispatch('input', {
			value: angle,
		})
	}
</script>

<InputRange
	bind:value={angle}
	{id}
	name={id}
	{label}
	{max}
	{min}
	on:input={update}
	{size}
	{step}
	{color}
	{disabled}
/>
