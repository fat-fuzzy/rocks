<script lang="ts">
	import type {MagicProps} from '$types'
	let {text, spell, level, uno, due, size, children}: MagicProps = $props()

	let genieUno = $derived(uno ? `magic:${spell} svg:${uno}` : '')
	let genieDue = $derived(due ? `magic:${spell} svg:${due} size:${size}` : '')
</script>

<ff-magic class={`${genieUno} align:center justify:between size:${size}`}>
	<ff-callout class={`magic:${spell} ${level} font:${size}`}>
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
