<script lang="ts">
	import type {MagicProps} from '$types'
	let {text, spell, level, uno, dos, size, children}: MagicProps = $props()
</script>

<span
	class={`ffr:icon magic:${spell} svg:${uno} size:${size} align:center justify:between`}
>
	<span class={`ffr:callout magic:${spell} ${level}`}>
		{#if text}
			{text}
		{:else if children}
			{@render children()}
		{/if}
	</span>
	<span class={`ffr:icon magic:${spell} svg:${dos} size:${size}`}
	></span>
</span>
