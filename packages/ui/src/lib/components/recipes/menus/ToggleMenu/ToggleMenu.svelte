<script lang="ts">
	import type {FuzzyPayload, ButtonType, ToggleMenuProps} from '$types'

	import {onMount} from 'svelte'

	import styleHelper from '$lib/utils/styles.js'
	import Toggle from '$lib/components/blocks/buttons/Toggle/Toggle.svelte'
	import ToggleMenuActor from './actor.svelte.js'

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

	let actor = $state(new ToggleMenuActor())
	actor.init({
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
		actor.update(payload)
		if (onupdate) {
			onupdate(actor.getSelected())
		}
	}

	function loadMenu(payload: FuzzyPayload) {
		actor.update(payload)
	}

	onMount(() => {
		if (init) {
			init(actor.getSelected())
		}
	})
</script>

{#snippet menuContent()}
	<menu {id} class={menuClasses} data-testid={id}>
		{#each actor.state as [itemId, props]}
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
