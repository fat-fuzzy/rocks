<script lang="ts">
	import type {FuzzyPayload, ButtonType, ToggleMenuProps} from '$types'

	import {onMount} from 'svelte'

	import styleHelper from '$lib/utils/styles.js'
	import Toggle from '$lib/components/blocks/buttons/Toggle/Toggle.svelte'
	import ToggleMenuStore from './store.svelte'

	let {
		id = 'toggle-menu',
		title,

		asset,
		assetType,
		color,
		size,
		shape,
		variant,
		container,
		layout = 'switcher',
		threshold,
		background = 'inherit',

		mode = 'radio',
		formaction,
		items = [],
		disabled,
		init,
		onupdate,
	}: ToggleMenuProps = $props()

	let store = $state(new ToggleMenuStore())
	store.init({
		items,
		mode,
	})

	let type: ButtonType = formaction ? 'submit' : 'button'

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

	function updateMenu(payload: FuzzyPayload) {
		store.update(payload)
		if (onupdate) {
			onupdate(store.getSelected())
		}
	}

	function loadMenu(payload: FuzzyPayload) {
		store.update(payload)
	}

	onMount(() => {
		if (init) {
			init(store.getSelected())
		}
	})
</script>

{#snippet menuContent()}
	<menu {id} class={menuClasses} data-testid={id}>
		{#each store.items as [itemId, props]}
			<li>
				<Toggle
					init={loadMenu}
					onclick={updateMenu}
					{type}
					{formaction}
					{color}
					{variant}
					{size}
					{shape}
					{asset}
					{assetType}
					{disabled}
					{...props}
					id={itemId}
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
