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

	export let fileType = 'image/png, image/jpeg'
	export let multiple = true
	let layout = 'stack'

	$: classes = `l:${layout} bp:${breakpoint} font:${size} ${size} ${color} ${variant} ${align}`
	$: hintClasses = `feedback card:${size} ${asset} ${status} outline font:${size}:minus ${color} ${variant} ${align}`
</script>

<label for={id} class={classes}>
	<span class={`font:${size} ${color}`}>{label}</span>
	{#if hint}<p id={`${id}-hint`} class={hintClasses}>{hint}</p>
	{/if}
	<input
		type="file"
		{id}
		{name}
		accept={fileType}
		aria-describedby={/* TODO: check is this correct? */ hint ? `${id}-hint` : ''}
		{multiple}
		class={`bg:${color}`}
	/>
</label>
