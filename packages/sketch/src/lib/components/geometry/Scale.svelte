<script lang="ts">
	import type {ScaleProps} from '$types'

	import ui from '@fat-fuzzy/ui'
	const {InputRange} = ui.blocks

	let {
		color = '',
		id = 'scale',
		size = '2xs',
		scaleX = $bindable(0),
		scaleY = $bindable(0),
		scaleZ = $bindable(undefined),
		minX = 0,
		maxX = 0,
		minY = 0,
		maxY = 0,
		minZ,
		maxZ,
		disabled,
		onupdate,
	}: ScaleProps = $props()

	function updateX() {
		onupdate({
			value: scaleX,
		})
	}

	function updateY() {
		onupdate({
			value: scaleY,
		})
	}

	function updateZ() {
		onupdate({
			value: scaleZ,
		})
	}
</script>

<div class="l:switcher:xs th:2xs">
	<InputRange
		bind:value={scaleX}
		id={`${id}-width`}
		name={`${id}-width`}
		label="Width"
		min={minX}
		max={maxX}
		step={0.01}
		oninput={updateX}
		{size}
		{color}
		{disabled}
	/>

	<InputRange
		bind:value={scaleY}
		id={`${id}-height`}
		name={`${id}-height`}
		label="Height"
		min={minY}
		max={maxY}
		step={0.01}
		oninput={updateY}
		{size}
		{color}
		{disabled}
	/>

	{#if minZ && maxZ}
		<InputRange
			bind:value={scaleZ}
			id={`${id}-depth`}
			name={`${id}-depth`}
			label="Depth"
			min={minZ}
			max={maxZ}
			step={0.01}
			oninput={updateZ}
			{size}
			{color}
			{disabled}
		/>
	{/if}
</div>
