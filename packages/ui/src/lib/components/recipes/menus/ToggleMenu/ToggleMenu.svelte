<script lang="ts">
	import type {FuzzyPayload, ButtonType, ToggleMenuProps} from '$types'

	import {onMount} from 'svelte'

	import styleHelper from '$lib/utils/styles.js'
	import Toggle from '$lib/components/blocks/buttons/Toggle/Toggle.svelte'
	import ToggleSystem from './system.svelte.js'

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
		align = 'start',
		mode,
		formaction,
		items = [],
		disabled,
		init,
		onupdate,
	}: ToggleMenuProps = $props()

	let system = new ToggleSystem()
	let type: ButtonType = $derived(formaction ? 'submit' : 'button')

	let menuClasses = $derived(
		styleHelper.getStyles({
			color,
			size,
			layout,
			threshold,
			container,
			background,
			align,
		}),
	)

	function updateMenu(payload: FuzzyPayload) {
		system.update(payload)
		if (onupdate) {
			onupdate(system.getState())
		}
	}

	function loadMenu(payload: FuzzyPayload) {
		system.update(payload)
	}

	onMount(() => {
		system.init({
			items,
			mode,
		})

		if (init) {
			init(system.getState())
		}
	})
</script>

{#snippet groupContent(items: Map<string, FuzzyPayload>)}
	{#each items as [itemId, props] (itemId)}
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
				width="full"
				{...props}
				id={itemId}
			/>
		</li>
	{/each}
{/snippet}

{#snippet menuContent()}
	<menu {id} class={menuClasses} data-testid={id}>
		{#if system.groups.size === 1}
			{@render groupContent(system.state)}
		{:else if system.groups.size > 1}
			{#each system.groups as [group, items] (group)}
				<li>
					<ol class="unstyled">
						{@render groupContent(items)}
					</ol>
				</li>
			{/each}
		{/if}
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
