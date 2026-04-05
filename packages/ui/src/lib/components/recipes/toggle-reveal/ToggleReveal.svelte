<script lang="ts">
	import type {ToggleRevealProps} from '$types'
	import styleHelper from '$lib/utils/styles'
	// import {clickOutside} from '$lib/utils/browser/click-outside'

	let {
		id = 'toggle-reveal',
		label = 'ToggleReveal',
		checked,
		// dismiss,
		auto,
		asset,
		assetType,
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
		place = 'nord',
		container,
		background,
		nav,
		children,
	}: ToggleRevealProps = $props()

	let labelClasses = $derived(
		styleHelper.getStyles({
			font,
			text,
			size,
			color,
			variant: 'bare',
		}),
	)

	let iconClasses = $derived(
		styleHelper.getStyles({
			asset,
			assetType,
			size,
			color,
			shape,
			variant,
		}),
	)

	let layoutClasses = $derived(
		styleHelper.getStyles({
			size,
			justify,
			align,
			height,
			width,
			container,
		}),
	)
	let areaClass = $derived(area ? `${area}:${place} ${place}` : place)
	let autoClasses = $derived(
		auto ? `auto bp:${breakpoint} th:${threshold}` : '',
	)
	let containerClasses = $derived(
		`${autoClasses} ${areaClass} ${layoutClasses}`,
	)

	let scrollClass = $derived(scroll ? `scroll:${scroll}` : '')
	let layerClass = $derived(layer ? `layer:${layer}` : '')
	let backgroundClass = $derived(background ? `bg:${background}` : '')
	let contentClasses = $derived(
		`w:full ${scrollClass} ${layerClass} ${backgroundClass}`,
	)
</script>

{#snippet control()}
	<ff-control class="gare-control">
		<label for={id} class={`ellipsis ${labelClasses}`}>
			<ff-label class="l:flex w:full align:center justify:between">
				{#if nav}
					{@render nav()}
				{:else}
					<span class="toggle-label">
						{label}
					</span>
				{/if}
				<ff-icon class={iconClasses}></ff-icon>
			</ff-label>
			<input type="checkbox" {id} class="{`sr-only ${place}`} {checked}" />
		</label>
	</ff-control>
{/snippet}

<!-- {#if dismiss === 'outside'}
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
{/if} -->

<ff-toggle-reveal class={containerClasses}>
	{@render control()}
	<ff-reveal class={contentClasses}>
		{@render children()}
	</ff-reveal>
</ff-toggle-reveal>
