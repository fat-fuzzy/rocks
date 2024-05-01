<script lang="ts">
	import {createEventDispatcher} from 'svelte'

	import {blocks} from '@fat-fuzzy/ui-s5'
	const {InputRange} = blocks
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
	export let disabled: boolean | undefined = undefined

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
		oninput={updateX}
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
		oninput={updateY}
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
			oninput={updateZ}
			{size}
			{color}
			{disabled}
		/>
	{/if}
</div>
