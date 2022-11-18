<script>
	import {theme} from '$stores/theme'
	import Button from '$blocks/button/Button.svelte'

	export let play = function () {
		return
	}
	export let stop = function () {
		return
	}

	let disabled = false
	let variant = ``

	$: variant = $theme ? `accent` : `highlight`
</script>

<div class="l-wrapper u-side xxl">
	<menu class="menu l-switcher sm">
		<Button testId="btn-play" {variant} handleClick={() => play()} type="button" {disabled}>
			▶︎ &nbsp;Play
		</Button>
		<Button testId="btn-stop" {variant} handleClick={() => stop()} type="button" {disabled}>
			◼ &nbsp;Stop
		</Button>
	</menu>
</div>
