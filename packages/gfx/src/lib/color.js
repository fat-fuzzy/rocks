/**
 * Color mode: Hue Saturation Brightness
 */

const HSB_TRANSLUCID = {
	mute: (step, angle) => [step * 10, step * 15, step * 22, 0.25],
	bright: (step, angle) => [angle + step, angle + step, angle + step, 0.25],
}

export default {
	HSB_TRANSLUCID,
}
