<script>
	import {createEventDispatcher} from 'svelte'

	import Button from '$lib/button/Button.svelte'

	export let play = () => {}
	export let stop = () => {}
	export let interactive = true

	const dispatch = createEventDispatcher()
	let disabled = false
	function toggleInputs() {
		console.log('Toggle geometry inputs visibility')
		dispatch('toggleInputs')
	}
</script>

<div>
	<!-- handleBlur={playBlur} -->
	<Button testId="btn-play" icon="play" label="👾 Play" handleClick={() => play()} {disabled} />
	<Button testId="btn-stop" icon="stop" label="🏁 Stop" handleClick={() => stop()} {disabled} />
	{#if interactive}
		<Button
			testId="btn-handles"
			icon="handles"
			label="🕹 Handles"
			handleClick={() => toggleInputs()}
			{disabled}
		/>
	{/if}
</div>
