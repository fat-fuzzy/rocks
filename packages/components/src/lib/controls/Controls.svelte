<script>
  import {theme} from '../../stores'
  import Button from '../button/Button.svelte'

  export let play = () => {}
  export let stop = () => {}

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
