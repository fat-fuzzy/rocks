<script>import { theme } from '../../stores/theme';
import { blocks } from '@fat-fuzzy/ui';
const { Button } = blocks;
export let canvas;
export let sketch;
let frame;
const loop = () => {
    sketch.draw();
    frame = requestAnimationFrame((t) => {
        // call requestAnimationFrame again with parameters
        loop();
    });
};
const play = () => loop();
const stop = () => {
    cancelAnimationFrame(frame);
    sketch.clear();
};
const pause = () => cancelAnimationFrame(frame);
let disabled = false;
$: variant = $theme ? `accent` : `highlight`;
</script>

<menu class="l:switcher bp:xxs sm">
	<Button id="btn-play" {variant} onClick={play} {disabled}>▶︎ &nbsp;Play</Button>
	<Button id="btn-pause" {variant} onClick={pause} {disabled}>⏸ &nbsp;Pause</Button>
	<Button id="btn-stop" {variant} onClick={stop} {disabled}>◼ &nbsp;Stop</Button>
</menu>
