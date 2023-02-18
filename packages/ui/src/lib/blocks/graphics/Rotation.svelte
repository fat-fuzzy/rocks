<script lang="ts">
	import {createEventDispatcher} from 'svelte'

	import Fieldset from '../forms/Fieldset.svelte'
	import InputRange from '../forms/InputRange.svelte'

	const dispatch = createEventDispatcher()

	export let size = 'xxs'
	const label = 'Rotation'
	export let angle = 0
	export let max = 0

	function update() {
		dispatch('input', {
			value: angle,
		})
	}
</script>

<Fieldset slug="rotation" legend={label} {size}>
	<!--https://css-tricks.com/accessible-svgs/-->
	<!-- <svg id="InteractiveSVG" role="group" /> -->
	<InputRange bind:value={angle} label="angle" {max} on:input={update} layout="stack" {size} />
</Fieldset>
