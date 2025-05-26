<script lang="ts">
	import type {MagicProps} from '$types'
	let {
		id,
		text,
		spell,
		level,
		uno,
		due,
		circle,
		shape,
		size,
		font,
		grow,
		children,
	}: MagicProps = $props()

	let genieUno = $derived(uno ? `magic:${spell} svg:${uno}` : '')
	let genieDue = $derived(due ? `magic:${spell} svg:${due} size:${size}` : '')
	let levelClass = $derived(level ? level : '')
	let variantClass = $derived(circle ? circle : '')
	let shapeClass = $derived(shape ? `shape:${shape}` : '')
	let growClass = $derived(grow ? 'w:full' : '')
	let fontClass = $derived(font ? `font:${font}` : size ? `font:${size}` : '')
</script>

<ff-magic
	class={`ff:magic ${genieUno} ${shapeClass} align:center justify:between size:${size} ${growClass} ${variantClass}`}
	data-testid={id}
>
	<ff-callout
		class={`magic:${spell} ${shapeClass} ${levelClass} ${fontClass} ${grow ? 'grow:1 l:flex align:center justify:center' : ''}`}
	>
		{#if text}
			{text}
		{:else if children}
			{@render children()}
		{/if}
	</ff-callout>
	{#if genieDue}
		<ff-icon class={genieDue}></ff-icon>
	{/if}
</ff-magic>
