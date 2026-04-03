<script lang="ts">
	import type {ToggleRevealProps} from '$types'
	import styleHelper from '$lib/utils/styles'
	import {clickOutside} from '$lib/utils/browser/click-outside'

	let {
		id = 'toggle-reveal',
		label = 'ToggleReveal',
		checked,
		dismiss,
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
		container,
		background,
		children,
	}: ToggleRevealProps = $props()

	let labelClasses = $derived(
		styleHelper.getStyles({
			color,
			shape,
			font,
			text,
			variant,
		}),
	)

	let iconClasses = $derived(
		styleHelper.getStyles({
			asset,
			assetType,
			size,
		}),
	)

	let layoutClasses = $derived(
		styleHelper.getStyles({
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
	let areaClass = $derived(area ? `${area}:${place} ${place}` : place)
	let containerClasses = $derived(`${areaClass} ${layoutClasses}`)

	let scrollClass = $derived(scroll ? `scroll:${scroll}` : '')
	let layerClass = $derived(layer ? `layer:${layer}` : '')
	let backgroundClass = $derived(background ? `bg:${background}` : '')
	let contentClasses = $derived(
		`${scrollClass} ${layerClass} ${backgroundClass}`,
	)
</script>

{#snippet control()}
	<ff-control class="gare-control">
		<label for={id} class={`ellipsis ravioli:3xs ${labelClasses}`}>
			<div class="l:flex align:center justify:between">
				<span>{label}</span>
				<ff-icon class={iconClasses}></ff-icon>
			</div>
			<input type="checkbox" {id} class="{`sr-only ${place}`} {checked}" />
		</label>
	</ff-control>
{/snippet}

{#if dismiss === 'outside'}
	<ff-toggle-reveal class={containerClasses} {@attach clickOutside}>
		{@render control()}
		<ff-reveal class={contentClasses}>
			{@render children()}
		</ff-reveal>
	</ff-toggle-reveal>
{:else}
	<ff-toggle-reveal class={containerClasses}>
		{@render control()}
		<ff-reveal class={contentClasses}>
			{@render children()}
		</ff-reveal>
	</ff-toggle-reveal>
{/if}
