<script lang="ts">
	import type {OverlayProps} from '$types'
	import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'
	import {onMount} from 'svelte'

	let {
		id,
		open = false,
		title,
		header,
		main,
		footer,
		children,
	}: OverlayProps = $props()

	let popover: HTMLElement

	onMount(() => {
		if (popover && open) {
			popover.showPopover()
		}
	})
</script>

<ff-popover {id}>
	<Expand
		id={`button-popover-${id}`}
		name={`button-popover-${id}`}
		popovertarget={`${id}-popover`}
	>
		{title}
	</Expand>
	<aside
		bind:this={popover}
		id={`${id}-popover`}
		popover="auto"
		aria-live="polite"
	>
		{#if header}
			<header>
				{@render header()}
			</header>
		{/if}
		{#if main}
			{@render main()}
		{/if}
		{#if children}
			{@render children()}
		{/if}
		{#if footer}
			<footer>
				{@render footer()}
			</footer>
		{/if}
	</aside>
</ff-popover>
