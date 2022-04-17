<script context="module" lang="ts">
	export const prerender = true
</script>

<script>
	import Fieldset from '$lib/Fieldset.svelte'
	import Toggle from '$lib/toggle/Toggle.svelte'
	import SignIn from '$lib/signIn/SignIn.svelte'
</script>

<svelte:head>
	<title>State Machines</title>
</svelte:head>

<form class="l-stack lg l-wrapper">
	<Fieldset slug="toggle" label="Toggle" size="sm">
		<Toggle />
	</Fieldset>
	<Fieldset slug="signIn" label="Sign In" size="sm">
		<SignIn />
	</Fieldset>
</form>
