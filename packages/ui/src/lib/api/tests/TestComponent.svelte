<script lang="ts">
	import type {SvelteComponent} from 'svelte'
	import Element from '../styles/Element.svelte'
	export let component: new (...args: any[]) => SvelteComponent
	type TestComponent = $$Generic<SvelteComponent>

	// TODO: test this wrapper for testing ui components once this issue is resolved:
	// https://github.com/microsoft/playwright/issues/26982
	// import TestComponent from '../../../dist/api/tests/TestComponent.svelte'
</script>

<Element {component} />
