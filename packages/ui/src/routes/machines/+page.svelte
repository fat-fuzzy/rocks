<script>
	import Toggle from '$blocks/buttons/Toggle.svelte'
	import Fieldset from '$blocks/forms/Fieldset.svelte'
</script>

<svelte:head>
	<title>UI Sandbox | 🤖 Machines</title>
	<meta name="description" content="A collection of state machines for learning purposes." />
</svelte:head>

<header>
	<h1>🤖 Machines</h1>
</header>

<form class="l-stack l-burrito md">
	<Fieldset slug="toggle" legend="Toggle" {size}>
		<Toggle />
	</Fieldset>
</form>
