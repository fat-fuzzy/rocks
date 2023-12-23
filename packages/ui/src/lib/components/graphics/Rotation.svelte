<script lang="ts">
	import {createEventDispatcher} from 'svelte'

	import Fieldset from '$lib/components/blocks/forms/Fieldset.svelte'
	import InputRange from '$lib/components/blocks/forms/InputRange.svelte'

	const dispatch = createEventDispatcher()

	export let color = ''

	export let size = 'xxs'
	export let id = 'rotation'
	export let label = 'Angle'
	const legend = 'Rotation'
	export let angle = 0
	export let max = 0
	export let disabled: boolean

	function update() {
		dispatch('input', {
			value: angle,
		})
	}
</script>

<Fieldset id="rotation-fieldset" {legend} {size} container="box:card">
	<!--https://css-tricks.com/accessible-svgs/-->
	<!-- <svg id="InteractiveSVG" role="group" /> -->
	<InputRange
		bind:value={angle}
		{id}
		name={id}
		{label}
		{max}
		on:input={update}
		{size}
		{color}
		{disabled}
	/>
</Fieldset>
