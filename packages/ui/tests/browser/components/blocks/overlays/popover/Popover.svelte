<script lang="ts">
	import Popover from '$lib/components/blocks/overlays/Popover/Popover.svelte'
	import {POPOVER_PROPS} from '$tests/fixtures/block-props'

	let {count = 1}: {count: number} = $props()

	const popover1 = POPOVER_PROPS[0]
	const popover2 = POPOVER_PROPS[1]
</script>

<Popover {...popover1.props}>
	<p>{popover1.expected.content}</p>
</Popover>

{#if count === 2}
	<Popover {...popover2.props}>
		<p>{popover2.expected.content}</p>
	</Popover>
{/if}

<p class="click-outside">Click outside</p>

<style>
	.click-outside {
		background-color: steelblue;
		height: 100px;
		color: white;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
