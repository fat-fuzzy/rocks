<script lang="ts">
	import {createEventDispatcher} from 'svelte'

	import Fieldset from '../form/Fieldset.svelte'
	import InputRange from '../form/InputRange.svelte'

	const dispatch = createEventDispatcher()

	export let size = 'nul'
	const label = 'Rotation'
	export let angle = 0
	export let max = 0

	function update() {
		dispatch('input', {
			value: angle,
		})
	}
</script>

<Fieldset slug="rotation" {label} {size}>
	<!--https://css-tricks.com/accessible-svgs/-->
	<!-- <svg id="InteractiveSVG" role="group" /> -->
	<InputRange bind:value={angle} label="angle" {max} on:input={update} />
</Fieldset>
