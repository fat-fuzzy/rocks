<script lang="ts">
	import type {SvelteComponent} from 'svelte'
	import Element from '$lib/api/styles/Element.svelte'
	export let component: new (...args: any[]) => SvelteComponent
	type TestComponent = $$Generic<SvelteComponent>

	// TODO: test this wrapper for testing ui components once this issue is resolved:
	// https://github.com/microsoft/playwright/issues/26982
</script>

<Element {component} />
