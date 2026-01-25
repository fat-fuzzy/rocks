<script lang="ts">
	import type {ButtonType, ButtonMenuProps, FuzzyPayload} from '$types'

	import styleHelper from '$lib/utils/styles.js'
	import Button from '$lib/components/blocks/buttons/Button.svelte'

	let {
		id = 'button-menu',
		title,

		asset,
		color,
		size,
		shape,
		variant,
		container,
		layout = 'switcher',
		threshold,
		background = 'inherit',

		formaction,
		items = [],
		disabled,
		onupdate,
	}: ButtonMenuProps = $props()

	function updateMenu(payload: FuzzyPayload) {
		if (onupdate) {
			onupdate(payload)
		}
	}

	let type: ButtonType = $derived(formaction ? 'submit' : 'button')
	let menuClasses = $derived(
		styleHelper.getStyles({
			color,
			size,
			layout,
			threshold,
			container,
			background,
		}),
	)
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
	<div class="menu">
		<p>{title}</p>
		{@render menuContent()}
	</div>
{:else}
	{@render menuContent()}
{/if}
