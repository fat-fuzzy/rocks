<script lang="ts">
	import {createEventDispatcher} from 'svelte'
	import {blocks} from '@fat-fuzzy/ui-s5'
	const {InputRange} = blocks

	const dispatch = createEventDispatcher()

	export let color = ''

	export let size = 'xxs'
	export let id = 'rotation'
	export let label = 'Angle'
	export let angle = 0
	export let min = 0
	export let max = 360
	export let disabled: boolean | undefined = undefined

	function update() {
		dispatch('input', {
			value: angle,
		})
	}
</script>

<InputRange
	bind:value={angle}
	id={`${id}-angle`}
	name={id}
	{label}
	{min}
	{max}
	oninput={update}
	{size}
	{color}
	{disabled}
/>
