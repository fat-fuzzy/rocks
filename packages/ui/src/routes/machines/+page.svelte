<script>
	import {headless} from '$lib'
	import Toggle from '$lib/components/blocks/buttons/Toggle.svelte'
	import Fieldset from '$lib/components/blocks/forms/Fieldset.svelte'
	const {Head} = headless
	let title = 'Machines'

	export let size = 'md'
	export let variant = 'primary'

	$: headerClass = 'l:switcher:xs card:sm align:center bg:polar'
</script>

<Head {title} page="Machines" description="A collection of state machines for learning purposes." />

<header class={headerClass}>
	<h1 class="l:main:80 card:md emoji:machines">{title}</h1>
</header>

<form class={`l:burrito:${size}`}>
	<Fieldset legend="Toggle">
		<Toggle text="Toggle" asset="emoji:star" {size} {variant} />
	</Fieldset>
</form>
