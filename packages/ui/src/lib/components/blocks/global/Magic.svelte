<script lang="ts">
	import type {MagicProps} from '$types'
	let {text, spell, level, uno, due, size, children}: MagicProps = $props()

	let genieUno = $derived(uno ? `ffr:icon magic:${spell} svg:${uno}` : '')
	let genieDue = $derived(due ? `ffr:icon magic:${spell} svg:${due} size:${size}` : '')
</script>

<span class={`${genieUno} align:center justify:between size:${size}`}>
	<span class={`ffr:callout magic:${spell} ${level} font:${size}`}>
		{#if text}
			{text}
		{:else if children}
			{@render children()}
		{/if}
	</span>
	{#if genieDue}
		<span class={genieDue}></span>
	{/if}
</span>
