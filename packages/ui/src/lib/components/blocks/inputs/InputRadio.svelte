<script lang="ts">
	import type {InputRadioProps} from '$types'
	import styleHelper from '$lib/utils/styles.js'
	import Feedback from '$lib/components/blocks/global/Feedback.svelte'

	let {
		id,
		name,
		label = 'Radio input',
		checked = false,
		disabled,
		value,
		required,
		status = 'default',
		hint,

		layout = 'switcher',
		threshold = '2xs',
		asset,
		align,
		justify,
		color,
		size,
		font,
		variant,
		background,
		container,

		oninput,
	}: InputRadioProps = $props()

	let classes = $derived(
		styleHelper.getStyles({
			color,
			font,
			size,
			align,
			justify,
			asset,
			variant,
			layout,
			threshold,
			container,
			background: background ? background : 'inherit',
		}),
	)
</script>

<label for={id} class={`ravioli:${size} ${classes} nowrap`} data-testid={id}>
	<span>{label}</span>
	<input
		{id}
		type="radio"
		{checked}
		{value}
		{name}
		{required}
		{oninput}
		{disabled}
		aria-describedby={hint ? `input-feedback-${id}` : undefined}
	/>
</label>

{#if hint}
	<Feedback
		id={`input-feedback-${id}`}
		{asset}
		{status}
		context="form"
		{size}
		{font}
		{variant}
	>
		<p>{hint}</p>
	</Feedback>
{/if}
