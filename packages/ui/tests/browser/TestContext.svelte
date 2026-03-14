<script lang="ts">
	import '@fat-fuzzy/style/css'
	import type {Snippet} from 'svelte'

	let {children}: {children: Snippet} = $props()
</script>

{@render children()}

<style>
	*,
	*::before,
	*::after {
		animation-duration: 0s !important;
		animation-delay: 0s !important;
		transition-duration: 0s !important;
		transition-delay: 0s !important;
	}
</style>
