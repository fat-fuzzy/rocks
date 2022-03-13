<script>
	import Tabs from './Tabs.svelte'

	export let components = []
	export let current = 0

	let textarea

	$: currentComponent = components.findIndex(({ id }) => id === current)
	$: tabs = components.map(({ id, name, type }) => ({
		id,
		name,
		type
	}))
</script>

<section>
	<Tabs {tabs} {current} on:select={(event) => (current = event.detail)} />
	<textarea
		bind:value={components[currentComponent].source}
		data-testid="input-repl"
		bind:this={textarea}
	/>
</section>
