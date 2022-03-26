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

<form class="form-sidebar">
	<Fieldset slug="toggle" label="Toggle" size="md">
		<Toggle />
	</Fieldset>
	<Fieldset slug="signIn" label="SignIn" size="md">
		<SignIn />
	</Fieldset>
</form>

<style lang="scss">
	@import '../../styles/common/form.scss';
</style>
