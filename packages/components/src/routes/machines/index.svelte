<script context="module" lang="ts">
	export const prerender = true
</script>

<script>
	import Fieldset from '$lib/Fieldset.svelte'
	import Toggle from '$lib/toggle/Toggle.svelte'
</script>

<svelte:head>
	<title>State Machines</title>
</svelte:head>

<form class="form-sidebar">
	<Fieldset slug="toggle" label="Toggle" size="md">
		<Toggle />
	</Fieldset>
</form>
