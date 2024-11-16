<script lang="ts">
	import type {PopoverProps} from '$types'

	let {id, children}: PopoverProps = $props()
</script>

<ff-popover {id} popover>
	{@render children()}
</ff-popover>
