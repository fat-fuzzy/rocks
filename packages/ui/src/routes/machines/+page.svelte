<script>
	import {headless} from '$lib'
	import Toggle from '$lib/components/blocks/buttons/Toggle.svelte'
	import Fieldset from '$lib/components/blocks/forms/Fieldset.svelte'
	const {Head} = headless
	let title = '🤖 Machines'

	export let size = 'md'
	export let variant = 'primary'
</script>

<Head {title} page="Machines" description="A collection of state machines for learning purposes." />

<header>
	<h1>🤖 Machines</h1>
</header>

<form class={`l:burrito:${size}`}>
	<Fieldset legend="Toggle">
		<Toggle text="Toggle" asset="🌟" {size} {variant} />
	</Fieldset>
</form>
