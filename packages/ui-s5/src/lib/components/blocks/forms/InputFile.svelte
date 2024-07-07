<script lang="ts">
	import type {InputFileProps} from './input.types.js'
	import {UiStatus, UiTextContext} from '$types/index.js'
	import styleHelper from '../blocks.styles.js'

	let {
		id = 'upload-image',
		name = 'upload-image',
		label = 'Upload image',
		hint = 'File types accepted: png, jpeg',
		layout = 'stack',
		status = UiStatus.default,

		disabled,
		asset,
		align,
		justify,
		color,
		size,
		variant,
		breakpoint,
		fileType = 'image/png, image/jpeg',
		multiple = true,
	}: InputFileProps = $props()

	let feedbackClasses = $derived(
		styleHelper.getFeedbackStyles(
			{size, asset, variant, align, justify},
			status,
			UiTextContext.form,
		),
	)

	let inputClasses = $derived(
		styleHelper.getStyles({
			color,
			font: size,
			size,
			align,
			justify,
			variant,
			layout,
			breakpoint,
		}),
	)
</script>

<label for={id} class={inputClasses}>
	<span class={`font:${size} ${color}`}>{label}</span>
	{#if hint}<p id={`${id}-hint`} class={feedbackClasses}>{hint}</p>
	{/if}
	<input
		type="file"
		{id}
		{name}
		accept={fileType}
		aria-describedby={/* TODO: check is this correct? */ hint
			? `${id}-hint`
			: ''}
		{multiple}
		class={`bg:${color}`}
		{disabled}
	/>
</label>
