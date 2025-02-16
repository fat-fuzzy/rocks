<script lang="ts">
	import type {ContentProps} from '$types'
	import styleHelper from '$lib/utils/styles.js'
	let {
		id,
		size,
		layout,
		color,
		justify,
		align,
		container,
		header,
		element,
		main,
		footer,
		children,
	}: ContentProps = $props()

	let blockClasses = styleHelper.getElementStyles({
		size,
		layout,
		color,
	})
	let containerClasses = styleHelper.getLayoutStyles({
		size,
		layout,
		container,
	})
	let contentClasses = $derived(`${blockClasses} ${containerClasses}`)
</script>

{#snippet cardContent()}
	{#if header}
		<header
			class={`l:stack:${size} justify:${justify} align${align} ${blockClasses}`}
		>
			{@render header()}
		</header>
	{/if}
	<div class={`content l:stack:${size}`}>
		{#if main}
			{@render main()}
		{/if}
		{#if children}
			{@render children()}
		{/if}
	</div>
	{#if footer}
		<footer
			class={`l:switcher:${size} ${blockClasses} justify:${justify} align:${align} bg:inherit`}
		>
			{@render footer()}
		</footer>
	{/if}
{/snippet}

{#if element}
	<svelte:element this={element} {id} class={contentClasses}>
		{@render cardContent()}
	</svelte:element>
{:else}
	{@render cardContent()}
{/if}
