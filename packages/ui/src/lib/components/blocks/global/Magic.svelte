<script lang="ts">
	import type {MagicProps} from '$types'
	let {text, spell, daemons, size}: MagicProps = $props()
</script>

{#if text}
	<span
		class={`ffr:icon magic:${spell} svg:${daemons.uno} size:${size} align:start`}
	>
		<span class={`ffr:callout card:xs magic:${spell}`}>{text}</span>
		&nbsp;&nbsp;&nbsp;&nbsp;
		<span class={`ffr:icon magic:${spell} svg:${daemons.dos} size:${size}`}
		></span>
	</span>
{/if}
