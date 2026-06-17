<script lang="ts">
	import type {ToggleRevealProps} from '$types'
	import styleHelper from '$lib/utils/styles'

	let {
		id = 'reveal-toggle',
		label = 'RevealToggle',
		asset,
		assetType,
		layout,
		scroll,
		layer,
		color,
		size,
		shape,
		font,
		text,
		breakpoint,
		threshold,
		variant,
		align,
		justify,
		area,
		width,
		height,
		place = 'top',
		position,
		container,
		background,
		children,
	}: ToggleRevealProps = $props()

	let labelClasses = $derived(
		styleHelper.getStyles({
			asset,
			assetType,
			color,
			shape,
			font,
			variant,
		}),
	)

	let layoutClasses = $derived(
		styleHelper.getStyles({
			position,
			size,
			justify,
			align,
			height,
			width,
			layout,
			breakpoint,
			threshold,
			container,
		}),
	)

	let areaClass = $derived(area ? `${area}:${place}` : place)
	let scrollClass = $derived(scroll ? `scroll:${scroll}` : '')
	let layerClass = $derived(layer ? `layer:${layer}` : '')
	let backgroundClass = $derived(background ? `bg:${background}` : '')

	let contentClasses = $derived(
		`${areaClass} ${scrollClass} ${layerClass} ${backgroundClass}`,
	)
</script>

<ff-toggle-reveal>
	<label for={id} class={`gare-control ${labelClasses}`}>
		<span class={`ellipsis text:${text} font:${font} sr-only`}>{label}</span>
		<input type="checkbox" {id} class="sr-only" />
	</label>
	<ff-reveal class={`gare-depot ${contentClasses}`}>
		{@render children()}
	</ff-reveal>
</ff-toggle-reveal>

<style>
	label:has(input:checked) + ff-reveal {
		transform: translateX(-100%);
		transition: transform 150ms ease-out;
	}
</style>
