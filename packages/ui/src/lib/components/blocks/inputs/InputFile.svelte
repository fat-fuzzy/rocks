<script lang="ts">
	import type {InputFileProps} from '$types'
	import {UiStatus, UiTextContext} from '$types'
	import styleHelper from '$lib/utils/styles.js'
	import Feedback from '$lib/components/blocks/global/Feedback.svelte'
	import Fieldset from '$lib/components/blocks/inputs/Fieldset.svelte'

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
		required,
		asset,
		align,
		justify,
		color,
		size,
		font,
		variant,
		background,
		breakpoint,
	}: InputFileProps = $props()

	let inputClasses = $derived(
		styleHelper.getStyles({
			color,
			font,
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

{#snippet input()}
	<label for={id} class={inputClasses} data-testid={id}>
		<span class={assetClass}>{label}</span>
		<input
			type="file"
			{id}
			{name}
			accept={fileType}
			aria-describedby="input-feedback-{id}"
			{multiple}
			{required}
			{disabled}
			class={inputClasses}
		/>
	</label>
{/snippet}

{#if hint}
	<Fieldset
		id={`fieldset-${id}`}
		name={`fieldset-${name}`}
		{layout}
		{size}
		{color}
		{variant}
	>
		{@render input()}
		<Feedback {id} {status} context={UiTextContext.form} {size} {variant}>
			{hint}
		</Feedback>
	</Fieldset>
{:else}
	{@render input()}
{/if}
