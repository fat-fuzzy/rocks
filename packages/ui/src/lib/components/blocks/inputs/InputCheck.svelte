<script lang="ts">
	import type {InputCheckProps} from '$types'
	import styleHelper from '$lib/utils/styles'
	import Feedback from '$lib/components/blocks/inputs/InputFeedback.svelte'
	import Tooltip from '$lib/components/blocks/overlays/Tooltip.svelte'

	let {
		id,
		name,
		label = 'Checkbox input',
		checked = false,
		indeterminate,
		disabled,
		isUiControl = false,
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
		containerSize,
		oninput,
		validator,
	}: InputCheckProps = $props()

	let errors = $derived(
		name && validator && validator?.fieldHasChanged(name)
			? validator?.getFieldErrors(name)
			: [],
	)

	let labelClasses = $derived(
		styleHelper.getStyles({
			color,
			font,
			size,
			align,
			justify: shape ? undefined : justify,
			asset: shape ? undefined : asset,
			shape,
			assetType,
			layout,
			threshold,
			container,
			containerSize,
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
			shape: shape === 'square' || shape === 'round' ? undefined : shape,
		}),
	)

	let inputClasses = $derived(
		isUiControl || shape === 'square' || shape === 'round' ? 'sr-only' : '',
	)
	let ffClasses = $derived(
		isUiControl || shape === 'square' || shape === 'round' ? 'ff-control' : '',
	)

	// Container styles
	let controlClasses = 'l:flex align:center w:full'
	let reverseClass = $derived(
		place === 'ouest'
			? 'reverse'
			: place === 'nord' || place === 'sud'
				? 'justify:center'
				: '',
	)
</script>

{#snippet input()}
	<input
		{id}
		name={name ?? undefined}
		{value}
		type="checkbox"
		bind:checked
		{indeterminate}
		{required}
		{oninput}
		{disabled}
		class={inputClasses}
		aria-labelledby={shape === 'square' || shape === 'round'
			? `labels-${id}`
			: undefined}
		aria-describedby={hint || errors?.length ? `feedback-${id}` : undefined}
	/>
{/snippet}

{#if shape === 'square' || shape === 'round'}
	<ff-control class={`${controlClasses} ${reverseClass}`}>
		<label class={labelClasses}>
			<ff-icon class={iconClasses}></ff-icon>
			{@render input()}
			<Tooltip id={`labels-${id}`} {label} {size} {variant} {font}>
				<Feedback
					id={`feedback-${id}`}
					{hint}
					{errors}
					{size}
					{variant}
					{font}
				/>
			</Tooltip>
		</label>
	</ff-control>
{:else}
	<label
		for={id}
		class={`${ffClasses} ellipsis nowrap ${labelClasses} ${iconClasses}`}
		data-testid={id}
	>
		<span>{label}</span>
		{@render input()}
	</label>
	<Feedback id={`feedback-${id}`} {hint} {errors} {size} {variant} {font} />
{/if}
