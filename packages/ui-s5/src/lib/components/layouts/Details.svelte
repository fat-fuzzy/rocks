<script lang="ts">
	import type { DetailsLayoutProps } from "./layout.types.js"

	let {
		layout,
		size,
		breakpoint,
		variant,
		align = 'start',
		id = 'reveal',
		summary,
		children,
	}: DetailsLayoutProps = $props()

	let expanded = $state(false)

	function toggleReveal(event) {
		expanded = !expanded
	}

	let show = $derived(expanded ? 'show' : 'hide')
</script>

<details class={`l:reveal l:${layout} bp:${breakpoint} ${size}`} open>
	<summary
		class={`${variant}`}
		aria-expanded={expanded}
		aria-controls={`${id}-menu-list`}
		onclick={toggleReveal}
	>
	{#if summary}
		{@render summary()}
	{:else}
		<p >Click to Reveal</p>
	{/if}
	</summary>
	<div class={`${align} ${show}`}>
		{#if children}
			{@render children()}
		{:else}
			<div class={`card layer ${size}`}>
				<h3>Revealed Content</h3>
				<p>This is a card with some content</p>
			</div>
		{/if}
	</div>
</details>
