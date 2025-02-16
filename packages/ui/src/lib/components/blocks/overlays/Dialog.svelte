<script lang="ts">
	import type {OverlayProps} from '$types'
	import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'

	let {
		id,
		open = false,
		title,
		header,
		main,
		footer,
		children,
	}: PopoverProps = $props()
</script>

<Expand
	id={`button-popover-${id}`}
	name={`button-popover-${id}`}
	popovertarget={`${id}-popover`}
>
	{title}
</Expand>
<dialog id={`${id}-popover`} {open}>
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
</dialog>
