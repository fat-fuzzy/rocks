<script lang="ts">
	import {createEventDispatcher} from 'svelte'

	import {blocks} from '@fat-fuzzy/ui'
	const {InputRange, Fieldset} = blocks

	const dispatch = createEventDispatcher()

	export let size = 'xxs'
	export let coordX = 0
	export let coordY = 0
	export let maxX = 0
	export let maxY = 0
	export let label = ''
	const legend = 'Position'

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

<Fieldset {legend} {size}>
	<InputRange
		bind:value={coordX}
		label="{`${label} `}x"
		max={maxX}
		on:input={updateX}
		layout="stack"
		{size}
	/>
	<InputRange
		bind:value={coordY}
		label="{`${label} `}y"
		max={maxY}
		on:input={updateY}
		layout="stack"
		{size}
	/>
</Fieldset>
