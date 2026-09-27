<script lang="ts">
	// Adapted from: https://dev.to/jh3y/circular-text-with-css-57jf
	import './text-circle.css'
	let {
		text,
		style = 'h1',
		element = 'p',
		asset,
		assetType = 'svg',
	}: {
		text: string
		style?: string
		element?: string
		asset?: string
		assetType?: string
	} = $props()

	let chars = $derived(text.split(''))
	let TOTAL_CHARACTERS = $derived(chars.length)
</script>

<div class="frame">
	<svelte:element
		this={element}
		class={`text-ring ${style}`}
		style={`--char-count: ${TOTAL_CHARACTERS}; --font-size: 1;`}
	>
		{#each chars as char, i (i)}
			<span aria-hidden="true" class="char" style={`--char-index: ${i}`}>
				{char}
			</span>
		{/each}
		{#if asset}
			<span
				aria-hidden="true"
				class="char"
				style={`--char-index: ${chars.length - 1}`}
			>
				<ff-icon class={`${assetType}:${asset} size:2xl`}> </ff-icon>
			</span>
		{/if}
		<span class="sr-only">{text}</span>
	</svelte:element>
</div>
