<script context="module" lang="ts">
	export const prerender = true
</script>

<script>
	import Toggle from '$lib/toggle/Toggle.svelte'
	import SignIn from '$lib/signIn/SignIn.svelte'
</script>

<svelte:head>
	<title>State Machines</title>
</svelte:head>

<form class="l-stack l-wrapper lg">
	<Toggle />
	<SignIn />
</form>
