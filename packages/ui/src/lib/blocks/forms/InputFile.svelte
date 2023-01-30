<script lang="ts">
	export let label = 'Upload image'
	export let name = 'upload-image'
	export let id = 'upload-image'
	export let hint = 'File types accepted: png, jpeg'
	export let color = ''
	export let variant = ''
	export let layout = ''
	export let breakpoint = ''
	export let size = ''
	export let align = ''

	export let fileType = 'image/png, image/jpeg'
	export let multiple = true

	$: classes = `l:${layout} bp:${breakpoint} ${size} ${color} ${variant} ${align}`
	$: hintClasses = `form:element font:sm ${color} ${variant} ${align}`
</script>

<label for={id} class={classes}>
	{label}
	<input
		type="file"
		{id}
		{name}
		accept={fileType}
		aria-describedby={/* TODO: check is this correct? */ hint ? `${id}-hint` : ''}
		{multiple}
	/>
</label>
{#if hint}<p id={`${id}-hint`} class={hintClasses}>{hint}</p> {/if}
