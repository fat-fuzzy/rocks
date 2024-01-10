<script lang="ts">
	import {createEventDispatcher} from 'svelte'

	import InputRange from '$lib/components/blocks/forms/InputRange.svelte'

	const dispatch = createEventDispatcher()

	export let id = 'position'

	export let color = ''
	export let size = 'xxs'
	export let coordX = 0
	export let coordY = 0
	export let coordZ: number | undefined = undefined
	export let maxX = 100
	export let maxY = 100
	export let maxZ: number | undefined = undefined
	export let minZ: number | undefined = undefined
	export let disabled: boolean

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

	function updateZ() {
		dispatch('input', {
			value: coordZ,
		})
	}
</script>

<div class="l:switcher:xs">
	<InputRange
		bind:value={coordX}
		id={`${id}-x`}
		name={`${id}-x`}
		label="x"
		max={maxX}
		min={-maxX}
		step={0.01}
		on:input={updateX}
		{size}
		{color}
		{disabled}
	/>

	<InputRange
		bind:value={coordY}
		id={`${id}-y`}
		name={`${id}-y`}
		label="y"
		max={maxY}
		min={-maxY}
		step={0.01}
		on:input={updateY}
		{size}
		{color}
		{disabled}
	/>

	{#if maxZ}
		<InputRange
			bind:value={coordZ}
			id={`${id}-z`}
			name={`${id}-z`}
			label="z"
			max={maxZ}
			min={minZ}
			step={0.01}
			on:input={updateZ}
			{size}
			{color}
			{disabled}
		/>
	{/if}
</div>
