<script lang="ts">
	import type {InputProps} from './input.types.js'
	import styleHelper from '../blocks.styles.js'

	let {
		id,
		name,
		label = 'Checkbox input',
		checked,
		layout = 'switcher',
		value,

		disabled,
		asset,
		align,
		justify,
		color,
		size,
		variant,
		background,
		container,
		oninput,
	}: InputProps = $props()

	function handleInput(event) {
		if (oninput) oninput(payload)
	}

	let classes = $derived(
		styleHelper.getStyles({
			color,
			font: size,
			size,
			align,
			justify,
			asset,
			variant,
			layout,
			container,
			background,
		}),
	)

	let payload = $derived({
		id: name, // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value
		name,
		value,
	})
</script>

<label for={id} class={classes}>
	<span>{label}</span>
	<input
		{id}
		data-test={id}
		type="checkbox"
		{value}
		{name}
		{checked}
		oninput={handleInput}
		{disabled}
	/>
</label>
