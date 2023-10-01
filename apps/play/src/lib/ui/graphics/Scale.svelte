<script lang="ts">
	import {createEventDispatcher} from 'svelte'

	import {blocks} from '@fat-fuzzy/ui'
	const {InputRange, Fieldset} = blocks

	export let size = 'xxs'
	export let scaleX = 0
	export let scaleY = 0
	export let minX = 0
	export let maxX = 0
	export let minY = 0
	export let maxY = 0
	export let label = ''

	const dispatch = createEventDispatcher()
	const legend = 'Scale'

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

<Fieldset {legend} {size}>
	<InputRange
		bind:value={scaleX}
		label="{label} x"
		min={minX}
		max={maxX}
		on:input={updateX}
		layout="stack"
		{size}
	/>
	<InputRange
		bind:value={scaleY}
		label="{label} y"
		min={minY}
		max={maxY}
		on:input={updateY}
		layout="stack"
		{size}
	/>
</Fieldset>
