<script lang="ts">
	import {onMount} from 'svelte'
	import type {ButtonType} from '$lib/components/blocks/buttons/button.types.js'
	import type {ButtonMenuProps} from './menu.types.js'
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

let type: ButtonType = $derived(formaction ? 'submit' : 'button')
let sizeClass = $derived(size ? `size:${size}` : '')
let containerClass = $derived(container ? `menu l:${container}:${size}` : '')
let layoutClass = $derived(layout ? `l:${layout}:${size}` : '')
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
