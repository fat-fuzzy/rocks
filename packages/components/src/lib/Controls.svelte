<script>
	import {onMount} from 'svelte'

	import EmojiButton from './EmojiButton.svelte'

	export let play = () => {}
	export let stop = () => {}
	export let toggleSidebar = () => {}
	export let showHandles

	let disabled = false

	onMount(() => {
		return () => {
			// uiStateUnsub()
		}
	})
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
			handleClick={() => toggleSidebar()}
			{disabled}
		/>
	{/if}
</div>

<style lang="scss">
	@import '../styles/blocks/controls.scss';
</style>
