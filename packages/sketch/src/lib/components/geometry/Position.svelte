<script lang="ts">
	import type {PositionProps} from '$types'
	import ui from '@fat-fuzzy/ui'
	const {InputRange} = ui.blocks

	let {
		color,
		id = 'position',
		size = '2xs',
		coordX = $bindable(0),
		coordY = $bindable(0),
		coordZ = $bindable(0),
		maxX = $bindable(0),
		minX = $bindable(0),
		maxY = $bindable(0),
		minY = $bindable(0),
		maxZ = $bindable(0),
		minZ = $bindable(0),
		disabled,
		onupdate,
	}: PositionProps = $props()

	function updateX() {
		onupdate({
			value: coordX,
		})
	}

	function updateY() {
		onupdate({
			value: coordY,
		})
	}

	function updateZ() {
		onupdate({
			value: coordZ,
		})
	}
</script>

<div class="l:switcher:xs th:2xs">
	<InputRange
		bind:value={coordX}
		id={`${id}-x`}
		name={`${id}-x`}
		label="x"
		max={maxX}
		min={minX}
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
		min={minY}
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
