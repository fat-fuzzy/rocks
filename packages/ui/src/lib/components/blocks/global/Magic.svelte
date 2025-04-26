<script lang="ts">
	import type {MagicProps} from '$types'
	let {text, spell, level, uno, due, size, grow, children}: MagicProps =
		$props()

	let genieUno = $derived(uno ? `magic:${spell} svg:${uno}` : '')
	let genieDue = $derived(due ? `magic:${spell} svg:${due} size:${size}` : '')
	let levelClass = $derived(level ? level : '')
</script>

<div
	class={`ff:magic ${genieUno} align:center justify:between size:${size} ${grow ? 'w:full' : ''}`}
	data-testid="Magic"
>
	<ff-callout
		class={`magic:${spell} ${levelClass} font:${size} ${grow ? 'grow:1 l:flex align:center justify:center' : ''}`}
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
