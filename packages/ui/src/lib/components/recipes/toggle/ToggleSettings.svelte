<script lang="ts">
	import type {SettingsProps, SwitchProps} from '$types'
	import styleHelper from '$lib/utils/styles'

	let {
		id = 'ui-settings',
		name = 'settings',
		background,
		color = 'primary',
		items,
	}: SettingsProps = $props()

	let showBackground = $derived(
		background ? `bg:${background}` : !color ? 'bg:inherit' : '',
	)
	let formClasses = $derived(`l:flex size:3xs nowrap ${showBackground}`)
	let ff_labelClasses = 'l:flex w:full align:center justify:between'
</script>

{#snippet control({
	id,
	name,
	label,
	variant,
	shape,
	color,
	size,
	value,
	asset,
	assetType,
}: SwitchProps)}
	{@const iconClasses = styleHelper.getStyles({
		asset,
		assetType,
		size,
		color,
		shape,
		variant,
	})}
	{@const labelClasses = styleHelper.getStyles({
		size,
		color,
		variant: 'bare',
	})}
	<ff-control>
		<label for={id} class={`ellipsis ${labelClasses}`}>
			<ff-label class={ff_labelClasses}>
				<span class="toggle-label">
					{label}
				</span>
				<ff-icon class={iconClasses}></ff-icon>
			</ff-label>
			<input
				type="radio"
				{id}
				{name}
				class={`sr-only  size:${size}`}
				checked={String(value).includes(id)}
			/>
		</label>
	</ff-control>
{/snippet}

<fieldset {id} {name} class={`menu:${name} ${formClasses}`}>
	{#each items as item, i (i)}
		{@render control(item)}
	{/each}
</fieldset>
