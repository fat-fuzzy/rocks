<script lang="ts">
	import {createEventDispatcher} from 'svelte'

	import InputRange from '../forms/InputRange.svelte'
	import Fieldset from '../forms/Fieldset.svelte'

	const dispatch = createEventDispatcher()

	export let size = 'xxs'
	export let coordX = 0
	export let coordY = 0
	export let maxX = 0
	export let maxY = 0
	const label = 'Position'

	function updateX() {
		dispatch('input', {
			value: coordX,
		})
	}

	function updateY() {
		dispatch('input', {
			value: coordY,
		})
	}
</script>

<Fieldset slug="position" legend={label} {size}>
	<InputRange bind:value={coordX} label="{label} x" max={maxX} on:input={updateX} />
	<InputRange bind:value={coordY} label="{label} y" max={maxY} on:input={updateY} />
</Fieldset>
