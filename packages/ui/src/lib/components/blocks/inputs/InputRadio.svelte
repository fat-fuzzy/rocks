<script lang="ts">
	import type {InputRadioProps} from '$types'
	import styleHelper from '$lib/utils/styles'
	import Feedback from '$lib/components/blocks/inputs/InputFeedback.svelte'

	let {
		id,
		name,
		label = 'Radio input',
		checked = false,
		disabled,
		value,
		required,
		hint,
		layout = 'switcher',
		threshold = '2xs',
		asset,
		assetType,
		shape,
		place,
		align,
		justify,
		color,
		size,
		font,
		variant,
		background,
		container,
		oninput,
		validator,
	}: InputRadioProps = $props()

	let errors = $derived(
		name && validator && validator?.fieldHasChanged(name)
			? validator?.getFieldErrors(name)
			: [],
	)

	let labelClasses = $derived(
		styleHelper.getStyles({
			color: shape ? undefined : color,
			font,
			size,
			align,
			justify: shape ? undefined : asset,
			asset: shape ? undefined : asset,
			shape,
			assetType,
			layout,
			threshold,
			container,
			background: background ? background : 'inherit',
		}),
	)

	let iconClasses = $derived(
		styleHelper.getStyles({
			asset,
			assetType,
			size,
			layout: 'flex',
			color,
			variant,
			shape,
		}),
	)

	let inputClasses = $derived(shape ? 'sr-only' : '')

	// Container styles
	let placeClass = $derived(place ? place : '')
	let controlClasses = 'l:flex align:center w:full'
	let reverseClass = $derived(
		place === 'ouest'
			? 'reverse'
			: place === 'nord' || place === 'sud'
				? 'justify:center'
				: '',
	)
</script>

{#snippet tooltip()}
	<ff-tooltip id={`${id}-tip`} role="tooltip" class={placeClass}>
		<p>{label}</p>
		<Feedback
			id={`input-feedback-${id}`}
			{hint}
			{errors}
			{size}
			{variant}
			{font}
		/>
	</ff-tooltip>
{/snippet}

{#snippet input()}
	<input
		{id}
		type="radio"
		{checked}
		{value}
		{name}
		{required}
		{oninput}
		{disabled}
		class={inputClasses}
		aria-labelledby={shape ? `${id}-tip` : undefined}
		aria-describedby={hint || errors?.length
			? `input-feedback-${id}`
			: undefined}
	/>
{/snippet}

{#if shape}
	<ff-control class={`${controlClasses} ${reverseClass}`}>
		<label for={id} class={labelClasses}>
			<ff-icon class={iconClasses}></ff-icon>
			{@render input()}
			{@render tooltip()}
		</label>
	</ff-control>
{:else}
	<label for={id} class={`ellipsis nowrap ${labelClasses}`} data-testid={id}>
		<span>{label} </span>
		{@render input()}
	</label>
	<Feedback
		id={`input-feedback-${id}`}
		{hint}
		{errors}
		{size}
		{variant}
		{font}
	/>
{/if}

<style>
	ff-control label.bare {
		--border-color: transparent;
	}
</style>
