<script lang="ts">
	import type {InputFileProps} from '$types'
	import styleHelper from '$lib/utils/styles'
	import Feedback from '$lib/components/blocks/inputs/InputFeedback.svelte'
	import Fieldset from '$lib/components/blocks/inputs/Fieldset.svelte'

	let {
		id = 'input-upload',
		name = 'input-upload',
		label = 'Upload image',
		hint = 'File types accepted: png, jpeg',
		disabled,
		multiple = true,
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
		errors = [],
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
			aria-describedby={hint || errors.length
				? `input-feedback-${id}`
				: undefined}
			{multiple}
			{required}
			{disabled}
			class={inputClasses}
		/>
	</label>
{/snippet}

{#if hint}
	<Fieldset
		context="form"
		id={`fieldset-${id}`}
		name={`fieldset-${name}`}
		{layout}
		{size}
		{color}
		{errors}
	>
		{@render input()}

		<Feedback
			context="form"
			id={`input-feedback-${id}`}
			{hint}
			{errors}
			{size}
			{variant}
			{font}
		/>
	</Fieldset>
{:else}
	{@render input()}
{/if}
