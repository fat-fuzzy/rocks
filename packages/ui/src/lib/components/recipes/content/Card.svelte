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

{#if element}
	<svelte:element this={element} class={contentClasses}>
		{#if header}
			<header>
				{@render header()}
			</header>
		{/if}
		<div class="content">
			{#if main}
				{@render main()}
			{/if}
			{#if children}
				{@render children()}
			{/if}
		</div>
		{#if footer}
			<footer>
				{@render footer()}
			</footer>
		{/if}
	</svelte:element>
{:else}
	{#if header}
		<header class={blockClasses}>
			{@render header()}
		</header>
	{/if}
	<div class="content">
		{#if main}
			{@render main()}
		{/if}
		{#if children}
			{@render children()}
		{/if}
	</div>
	{#if footer}
		<footer class={blockClasses}>
			{@render footer()}
		</footer>
	{/if}
{/if}
