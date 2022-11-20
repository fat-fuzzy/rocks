<script>
	import Toggle from '$lib/blocks/toggle/Toggle.svelte'
	import SignIn from '$lib/blocks/signIn/SignIn.svelte'
</script>

<svelte:head>
	<title>UI Sandbox | 🤖 Machines</title>
	<meta name="description" content="A collection of state machines for learning purposes." />
</svelte:head>

<header>
	<h1>🤖 Machines</h1>
</header>

<form class="l-stack l-wrapper md">
	<Toggle />
	<SignIn />
</form>
