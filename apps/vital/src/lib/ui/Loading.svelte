<script lang="ts">
	import type {UiColor, UiShape, UiSize, UiVariant} from '@fat-fuzzy/ui'

	let {
		message,
		color = 'primary',
		variant = 'bare',
		shape = 'mellow',
		asset = 'none',
		size,
	}: {
		message?: string
		color?: UiColor
		variant?: UiVariant
		shape?: UiShape
		asset?: string
		size?: UiSize
	} = $props()

	let shapeClass = $derived(shape ? `shape:${shape}` : '')
	let feedbackClass = $derived(
		`variant:${variant} ${shapeClass} asset:${asset} surface:1:${color} size:${size}`,
	)

	let feedbackMessage = $derived(message ?? 'Loading')
</script>

<div class={`feedback:prose ${feedbackClass}`} aria-busy="true">
	<div class="l:stack align:center justify:center ravioli:md">
		<p class="text:center font:heading ravioli:xs font:semibold">
			{feedbackMessage}
		</p>
		<ff-icon class="emoji:default"></ff-icon>
	</div>
</div>
