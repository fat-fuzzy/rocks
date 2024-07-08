<script lang="ts">
	import type {InputFileProps} from './input.types.js'
	import {UiStatus, UiTextContext} from '$types/index.js'
	import styleHelper from '$lib/utils/styles.js'
	import Feedback from '$lib/components/blocks/global/Feedback.svelte'

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
	{label}
	<input
		type="file"
		{id}
		{name}
		accept={fileType}
		aria-describedby={/* TODO: check is this correct? */ hint
			? `${id}-hint`
			: ''}
		{multiple}
		{disabled}
	/>
</label>
{#if hint}
	<Feedback {status} context={UiTextContext.form} {size} {variant}>
		{hint}
	</Feedback>
{/if}
