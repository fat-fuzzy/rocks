<script lang="ts">
	import Fieldset from './Fieldset.svelte'

	export let size = 'md'
	export let legend = 'Upload'
	export let label = 'Upload image file'
	export let id = 'upload-image'
	export let name = 'upload-image'
	export let hint = 'File types accepted: png, jpeg'
	export let fileType = 'image/png, image/jpeg'
	export let variant = 'primary'
	export let multiple = true
</script>

<Fieldset slug={legend.toLowerCase()} {legend} {size}>
	<label for={id}>{label}</label>
	<input
		type="file"
		{id}
		{name}
		accept={fileType}
		aria-describedby={/* TODO: check is this correct? */ hint ? `${id}-hint` : ''}
		class={variant}
		{multiple}
	/>
	{#if hint}<p id={`${id}-hint`} class="hint">{hint}</p> {/if}
	<button>Submit</button>
</Fieldset>
