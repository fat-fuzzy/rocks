<script lang="ts">
	import type {RevealLayoutProps} from '$types'
	import constants from '$lib/types/constants.js'
	const {DEFAULT_REVEAL_STATE} = constants

	let {
		id = 'RevealContent',
		reveal = DEFAULT_REVEAL_STATE.reveal,
		area,
		children,
	}: RevealLayoutProps = $props()

	let expanded = $derived(reveal)
</script>

<ff-reveal id={`${id}-reveal`} class={`${expanded} ${area}`}>
	{#if children}
		{@render children()}
	{/if}
</ff-reveal>
