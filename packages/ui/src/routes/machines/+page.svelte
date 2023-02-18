<script>
	import Toggle from '$blocks/buttons/Toggle.svelte'
	import Fieldset from '$blocks/forms/Fieldset.svelte'

	export let size = 'md'
	export let variant = 'primary'
</script>

<svelte:head>
	<title>UI Sandbox | 🤖 Machines</title>
	<meta name="description" content="A collection of state machines for learning purposes." />
</svelte:head>

<header>
	<h1>🤖 Machines</h1>
</header>

<form class={`l:burrito:${size}`}>
	<Fieldset legend="Toggle">
		<Toggle {size} {variant} />
	</Fieldset>
</form>
