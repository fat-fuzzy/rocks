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

<form method="post" enctype="multipart/form-data" class={size}>
	<Fieldset slug={legend.toLowerCase()} {legend}>
		<label for={id}>{label}</label>
		<input
			type="file"
			{id}
			{name}
			accept={fileType}
			aria-describedby={`${id}-hint`}
			class={variant}
			{multiple}
		/>
		<p id={`${id}-hint`} class="hint">{hint}</p>

		<button>Submit</button>
	</Fieldset>
</form>
