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
		size,
		font,
		grow,
		children,
	}: MagicProps = $props()

	let genieUno = $derived(uno ? `magic:${spell} svg:${uno}` : '')
	let genieDue = $derived(due ? `magic:${spell} svg:${due} size:${size}` : '')
	let levelClass = $derived(level ? level : '')
	let variantClass = $derived(circle ? circle : '')
	let growClass = $derived(grow ? 'w:full' : '')
	let fontClass = $derived(font ? `font:${font}` : size ? `font:${size}` : '')
</script>

<div
	class={`ff:magic ${genieUno} align:center justify:between size:${size} ${growClass} ${variantClass}`}
	data-testid={id}
>
	<ff-callout
		class={`magic:${spell} ${levelClass} ${fontClass} ${grow ? 'grow:1 l:flex align:center justify:center' : ''}`}
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
</div>
