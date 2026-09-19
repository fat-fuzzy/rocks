<script lang="ts">
	// src: https://dev.to/jh3y/circular-text-with-css-57jf
	let {
		text,
		style = 'h1',
		element = 'p',
	}: {
		text: string
		style?: string
		element?: string
	} = $props()

	const chars = $derived(text.split(''))
	const TOTAL_CHARACTERS = $derived(chars.length)
	const LENGTH_OF_SIDE = $derived(3) // 1ch
</script>

<div class="frame">
	<svelte:element
		this={element}
		class={`text-ring ${style}`}
		style={`--char-count: ${TOTAL_CHARACTERS}; --font-size: 1; --character-width: ${LENGTH_OF_SIDE};`}
	>
		{#each chars as char, i (i)}
			<span aria-hidden="true" class="char" style={`--char-index: ${i}`}>
				{char}
			</span>
		{/each}
		<span class="sr-only">{text}</span>
	</svelte:element>
</div>

<style>
	.frame {
		position: absolute;
		aspect-ratio: 1;
		display: grid;
		place-items: center;
	}

	.text-ring {
		--inner-angle: calc((360 / var(--char-count)) * 1deg);
		--radius: calc(var(--character-width) / sin(var(--inner-angle)) * -1em);

		font-family: var(--font-family-mono);
		text-transform: uppercase;
		font-size: calc(var(--font-size, 1) * 10vmin);
		position: relative;
		box-shadow: none;
	}

	.char {
		display: inline-block;
		position: absolute;
		font-weight: bold;
		top: 50%;
		left: 50%;
		font-size: var(--font-size-lg);
		transform: translate(-50%, -50%)
			rotate(calc(var(--inner-angle) * var(--char-index)))
			translateY(var(--radius));
	}

	@media (prefers-reduced-motion: no-preference) {
		.text-ring {
			animation: rotation 15s infinite linear;
		}
	}

	@keyframes rotation {
		to {
			rotate: -360deg;
		}
	}
</style>
