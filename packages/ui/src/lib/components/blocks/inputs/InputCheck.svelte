<script lang="ts">
	import type {InputCheckProps} from '$types'
	import styleHelper from '$lib/utils/styles.js'
	import Feedback from '$lib/components/blocks/global/Feedback.svelte'

	let {
		id,
		name,
		label = 'Checkbox input',
		checked = false,
		indeterminate,
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
	}: InputCheckProps = $props()

	function handleInput(event: Event) {
		if (oninput) oninput(event)
	}

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
		name={name ?? undefined}
		{value}
		type="checkbox"
		bind:checked
		{indeterminate}
		{required}
		oninput={handleInput}
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
		{font}
		{size}
		{variant}
	>
		<p>{hint}</p>
	</Feedback>
{/if}
