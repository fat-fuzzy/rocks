<script>
	import {headless} from '$lib'
	import Toggle from '$lib/components/blocks/buttons/Toggle.svelte'
	import Fieldset from '$lib/components/blocks/forms/Fieldset.svelte'
	const {Head} = headless
	let title = 'Machines'

	export let size = 'md'
	export let variant = 'primary'

	$: headerClass = 'page-header bg:polar'
</script>

<Head {title} page="Machines" description="A collection of state machines for learning purposes." />

<header class={headerClass}>
	<h1 class="card:lg emoji:machines">{title}</h1>
</header>

<form class={`l:burrito:${size}`}>
	<Fieldset legend="Toggle">
		<Toggle text="Toggle" asset="emoji:star" {size} {variant} />
	</Fieldset>
</form>
