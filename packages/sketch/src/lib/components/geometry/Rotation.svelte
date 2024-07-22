<script lang="ts">
	import {blocks} from '@fat-fuzzy/ui'
	const {InputRange} = blocks

	type Props = {
		color: string
		id?: string
		size: string
		label?: string
		angle: number
		min?: number
		max?: number
		disabled?: boolean
		onupdate: (payload: {value: number | undefined}) => void
	}

	let {
		color = '',
		id = 'rotation',
		label = 'Angle',
		size = '2xs',
		angle = $bindable(0),
		min = 0,
		max = 360,
		disabled,
		onupdate,
	}: Props = $props()

	function update() {
		onupdate({
			value: angle,
		})
	}
</script>

<InputRange
	bind:value={angle}
	id={`${id}-angle`}
	name={id}
	{label}
	{min}
	{max}
	oninput={update}
	{size}
	{color}
	{disabled}
/>
