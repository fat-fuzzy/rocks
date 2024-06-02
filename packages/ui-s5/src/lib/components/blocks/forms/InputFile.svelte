<script lang="ts">
	import {UiStatus} from '$types/index.js'

	import type {InputFileProps} from './input.types.js'

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

	/* Element styles */
	let colorClass = color ? `bg:${color}` : ''
	let sizeClass = size ? `size:${size}` : ''
	let assetClass = asset ? `emoji:${asset}` : ''
	let fontClass = size ? `font:${size}` : ''
	let variantClass = variant ? `variant:${variant}` : ''
	let alignClass = align ? `align:${align}` : ''
	let justifyClass = justify ? `justify:${justify}` : ''
	let statusClass = $derived(status ? `status:${status}` : '')

	let elementClasses = `${colorClass} ${sizeClass} ${variantClass} ${alignClass} ${fontClass}`

	/* Context styles */
	let layoutClasses = breakpoint
		? `l:${layout} bp:${breakpoint}`
		: `l:${layout}`
	let feedbackClasses = $derived(
		`feedback:form ${assetClass} ${statusClass} ${variantClass} ${alignClass} ${justifyClass}`,
	)
	let hintClasses = $derived(
		fontClass ? `${feedbackClasses} ${fontClass}:minus` : `${feedbackClasses}`,
	)

	let inputClasses = `${layoutClasses} ${elementClasses}`
</script>

<label for={id} class={inputClasses}>
	<span class={`font:${size} ${color}`}>{label}</span>
	{#if hint}<p id={`${id}-hint`} class={hintClasses}>{hint}</p>
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
