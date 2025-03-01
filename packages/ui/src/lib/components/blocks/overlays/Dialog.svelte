<script lang="ts">
	import type {OverlayProps} from '$types'
	import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'

	let {id, open = false, title, children}: OverlayProps = $props()
</script>

<Expand
	id={`button-popover-${id}`}
	name={`button-popover-${id}`}
	popovertarget={`${id}-popover`}
>
	{title}
</Expand>

<dialog id={`${id}-popover`} {open}>
	{@render children()}
</dialog>
