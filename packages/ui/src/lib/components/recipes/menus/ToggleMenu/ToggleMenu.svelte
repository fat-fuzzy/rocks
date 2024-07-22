<script lang="ts">
	import Toggle from '$lib/components/blocks/buttons/Toggle/Toggle.svelte'
	import type {FuzzyPayload} from '$types/machines.js'
	import type { ButtonType } from '$lib/components/blocks/buttons/button.types.js'
	import { type ToggleMenuProps} from './toggleMenu.types.js'
	import ToggleMenuStore from './store.svelte'
	import { onMount } from 'svelte'

	let {
		id = 'toggle-menu',
		title,

		asset,
		color,
		size,
		shape,
		variant,
		container='stack',
		layout = 'switcher',
		threshold,

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
	let sizeClass = size ? `size:${size}` : ''
	let containerClass = container ? `menu l:${container}:${size}` : ''
	let layoutClass = layout ? `l:${layout}:${size}` : ''
	let thresholdClass = $derived(threshold ? `th:${threshold}` : '')
	let menuClasses = $derived(`${layoutClass} ${thresholdClass} ${sizeClass} mode:${mode}`)

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
	<menu {id} class={menuClasses}>
		{#each store.items as [id, props]}
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
