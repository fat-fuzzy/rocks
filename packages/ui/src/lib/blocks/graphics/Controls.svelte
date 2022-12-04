<script lang="ts">
	import {theme} from '../../stores/theme'
	import Button from '../buttons/Button.svelte'

	export let play = () => {}
	export let stop = () => {}

	let disabled = false
	let variant = ``

	$: variant = $theme ? `accent` : `highlight`
</script>

<div class="l-burrito xxl">
	<menu class="menu l-switcher sm">
		<Button id="btn-play" {variant} onClick={play} type="button" {disabled}>▶︎ &nbsp;Play</Button>
		<Button id="btn-stop" {variant} onClick={stop} type="button" {disabled}>◼ &nbsp;Stop</Button>
	</menu>
</div>
