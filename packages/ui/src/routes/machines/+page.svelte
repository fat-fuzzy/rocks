<script>
	import Toggle from '$blocks/toggle/Toggle.svelte'
	import SignIn from '$blocks/signIn/SignIn.svelte'
</script>

<svelte:head>
	<title>Sandbox | 🤖 Machines</title>
	<meta name="description" content="A collection of state machines for learning purposes." />
</svelte:head>

<header>
	<h1>🤖 Machines</h1>
</header>

<form class="l-stack l-wrapper u-side md">
	<Toggle />
	<SignIn />
</form>
