<script lang="ts">
	export let label = 'Upload image'
	export let name = 'upload-image'
	export let id = 'upload-image'
	export let hint = 'File types accepted: png, jpeg'
	export let color = ''
	export let variant = ''
	export let breakpoint = ''
	export let size = ''
	export let align = ''
	export let status = ''
	export let asset = ''
	export let disabled: boolean

	export let fileType = 'image/png, image/jpeg'
	export let multiple = true
	let layout = 'stack'

	/* Element styles */
	let colorClass = color ? `color:${color}` : ''
	let sizeClass = size ? `size:${size}` : ''
	let fontClass = size ? `font:${size}` : ''
	let variantClass = variant ? `variant:${variant}` : ''
	let alignClass = align ? `align:${align}` : ''

	let elementClasses = `${asset} ${colorClass} ${sizeClass} ${variantClass} ${alignClass} ${fontClass}`

	/* Context styles */
	let layoutClasses = breakpoint
		? `l:${layout} bp:${breakpoint}`
		: `l:${layout}`
	let hintClasses = `feedback card:${size} ${asset} ${status} ${colorClass} ${variantClass} ${alignClass}`
	hintClasses = fontClass
		? `${hintClasses} ${fontClass}:minus`
		: `${hintClasses}`

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
