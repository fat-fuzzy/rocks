<script lang="ts">
	import ui from '@fat-fuzzy/ui'
	const {InputRange} = ui.blocks

	type Props = {
		color: string
		id?: string
		size: string
		label?: string
		coordX: number
		coordY: number
		coordZ?: number
		maxX: number
		minX?: number
		maxY: number
		minY?: number
		maxZ?: number
		minZ?: number
		disabled?: boolean
		onupdate: (payload: {value: number | undefined}) => void
	}

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
	}: Props = $props()

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

<div class="l:switcher:xs">
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
