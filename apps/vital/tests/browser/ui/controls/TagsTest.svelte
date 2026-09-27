<script lang="ts">
	import Tags from '$lib/ui/controls/tags/Tags.svelte'
	import TestContext from '$tests/browser/TestContext.svelte'
	import {TAGS_PROPS} from '$tests/fixtures/control-props'
</script>

<TestContext>
	{#each TAGS_PROPS as { props }, i (i)}
		<Tags {...props} />
	{/each}
</TestContext>
