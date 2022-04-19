<script lang="ts">
	import {createEventDispatcher} from 'svelte'

	import InputRange from '$lib/form/InputRange.svelte'
	import Fieldset from '$lib/form/Fieldset.svelte'

	const dispatch = createEventDispatcher()
	export let size = 'md'
	export let scaleX = 0
	export let scaleY = 0
	export let minX = 0
	export let maxX = 0
	export let minY = 0
	export let maxY = 0

	const label = 'Scale'

	function updateX() {
		dispatch('input', {
			value: scaleX,
		})
	}

	function updateY() {
		dispatch('input', {
			value: scaleY,
		})
	}
</script>

<Fieldset slug="scale" {label} {size}>
	<InputRange bind:value={scaleX} label="x" min={minX} max={maxX} on:input={updateX} />
	<InputRange bind:value={scaleY} label="y" min={minY} max={maxY} on:input={updateY} />
</Fieldset>
