<script lang="ts">
	import type {ButtonType, ButtonMenuProps} from '$types'
	import Button from '$lib/components/blocks/buttons/Button.svelte'

	let {
		id = 'button-menu',
		title,

		asset,
		color,
		size,
		shape,
		variant,
		container = 'stack',
		layout = 'switcher',
		threshold,

		formaction,
		items = [],
		disabled,
		onupdate,
	}: ButtonMenuProps = $props()

	function updateMenu(payload: {name: string; value: string | number}) {
		if (onupdate) {
			onupdate(payload)
		}
	}

let type: ButtonType = formaction ? 'submit' : 'button'
let sizeClass = size ? `size:${size}` : ''
let containerClass = container ? `menu l:${container}:${size}` : ''
let layoutClass = layout ? `l:${layout}:${size}` : ''
let thresholdClass = $derived(threshold ? `th:${threshold}` : '')
let menuClasses = $derived(`${layoutClass} ${thresholdClass} ${sizeClass}`)

</script>

{#snippet menuContent()}
	<menu {id} class={menuClasses}>
		{#each items as props, i}
			{@const itemColor = props.color ?? color}
			{@const itemVariant = props.variant ?? variant}
			{@const itemSize = props.size ?? size}
			{@const itemAsset = props.asset ?? asset}
			{@const itemShape = props.shape ?? shape}
			<li>
				<Button
					onclick={updateMenu}
					{type}
					{formaction}
					color={itemColor}
					variant={itemVariant}
					size={itemSize}
					asset={itemAsset}
					shape={itemShape}
					{disabled}
					{...props}
				/>
			</li>
		{/each}
	</menu>
{/snippet}

{#if title}
	<div class={containerClass}>
		<p>{title}</p>
		{@render menuContent()}
	</div>
{:else}
	{@render menuContent()}
{/if}
