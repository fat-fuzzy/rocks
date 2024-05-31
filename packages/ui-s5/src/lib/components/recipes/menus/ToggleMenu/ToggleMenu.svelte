<script lang="ts">
	import Toggle from '$lib/components/blocks/buttons/Toggle/Toggle.svelte'
	import type {TogglePayload} from '$lib/components/blocks/buttons/Toggle/toggle.types.js'
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
		onload,
		onupdate,
	}: ToggleMenuProps = $props()


	let store = $state(new ToggleMenuStore())
	store.init({
		items,
		mode,
	})

	let type: ButtonType = formaction ? 'submit' : 'button'
	let sizeClass = size ? `size:${size}` : ''
	let containerClass = container ? `l:${container}:${size} ${sizeClass}` : ''
	let layoutClass = layout ? `l:${layout}:${size}` : ''
	let thresholdClass = threshold ? `th:${threshold}` : ''
	let elementClasses =` ${layoutClass} :${thresholdClass} ${sizeClass} mode:${mode}`
	let menuClasses = title ? elementClasses :`${elementClasses} ${containerClass}`

	function updateMenu(payload: TogglePayload) {
		store.update(payload)
		if (onupdate) {
			onupdate(store.getSelected())
		}
	}

	function loadMenu(payload: TogglePayload) {
		store.update(payload)
	}

	onMount(() => {
		if (onload) {
			onload(store.getSelected())
		}
	})
</script>

{#snippet menuContent()}
	<menu {id} class={menuClasses}>
		{#each store.items as [id, props]}
			<li>
				<Toggle
					onload={loadMenu}
					onclick={updateMenu}
					{type}
					{formaction}
					{...props}
					{color}
					{variant}
					{size}
					{shape}
					{asset}
					{disabled}
				/>
			</li>
		{/each}
	</menu>
{/snippet}

{#if title}
	<div class={`menu ${containerClass}`}>
		<p>{title}</p>
		{@render menuContent()}
	</div>
{:else}
	{@render menuContent()}
{/if}
