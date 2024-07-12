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
		disabled,
		multiple = true,
		status = UiStatus.default,
		fileType = 'image/png, image/jpeg',

		layout = 'stack',
		asset,
		align,
		justify,
		color,
		size,
		variant,
		background,
		breakpoint,
	}: InputFileProps = $props()

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
			background: background ? background : 'inherit',
		}),
	)

	let assetClass = $derived(
		styleHelper.getStyles({
			asset,
		}),
	)
</script>

<label for={id} class={inputClasses}>
	<span class={assetClass}>{label}</span>
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
