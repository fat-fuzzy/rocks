<script>
	import Button from '../button/Button.svelte'

	export let play = () => {}
	export let stop = () => {}

	let disabled = false
</script>

<form class="sm">
	<Button testId="btn-play" variant="accent" handleClick={() => play()} type="button" {disabled}>
		▶️ &nbsp;Play
	</Button>
	<Button testId="btn-stop" variant="accent" handleClick={() => stop()} type="button" {disabled}>
		⏹ &nbsp;Stop
	</Button>
</form>
