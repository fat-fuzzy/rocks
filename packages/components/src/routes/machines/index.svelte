<script context="module" lang="ts">
	export const prerender = true
</script>

<script>
	import Toggle from '$lib/toggle/Toggle.svelte'
	import SignIn from '$lib/signIn/SignIn.svelte'
</script>

<svelte:head>
	<title>Sandbox | 🤖 State Machines</title>
	<meta name="description" content="A collection of state machines for learning purposes." />
</svelte:head>

<header>
	<h1>🤖 State Machines</h1>
</header>

<form class="l-stack l-wrapper u-side md">
	<Toggle />
	<SignIn />
</form>
