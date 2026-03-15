<script lang="ts">
	import Button from '$lib/components/blocks/buttons/Button.svelte'
	import TestContext from '$tests/browser/TestContext.svelte'
	import {BUTTON_PROPS} from '$tests/fixtures/block-props'
</script>

<TestContext>
	{#each BUTTON_PROPS as { props }, i (i)}
		<Button {...props} />
	{/each}
</TestContext>
