<script>
	import EmojiButton from '$lib//button/EmojiButton.svelte'

	export let play = () => {}
	export let stop = () => {}

	let showHandles = true
	let disabled = false
	function toggleInputs() {
		console.log('Toggle geometry inputs visibility')
	}
</script>

<!-- handleBlur={playBlur} -->
<div class="controls">
	<EmojiButton
		dataCy="btn-play"
		buttonClass="play"
		buttonLabel="👾 Play"
		handleClick={() => play()}
		{disabled}
	/>
	<EmojiButton
		dataCy="btn-stop"
		buttonClass="stop"
		buttonLabel="🏁 Stop"
		handleClick={() => stop()}
		{disabled}
	/>
	{#if showHandles}
		<EmojiButton
			dataCy="btn-handles"
			buttonClass="handles"
			buttonLabel="🕹 Handles"
			handleClick={() => toggleInputs()}
			{disabled}
		/>
	{/if}
</div>

<style lang="scss">
	@import '../../styles/main.scss';
</style>
