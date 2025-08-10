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
		align = 'start',
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
			align,
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

{#snippet groupContent(items: Map<string, FuzzyPayload>)}
	{#each items as [itemId, props]}
		<li class="l:stack:3xs">
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
{/snippet}

{#snippet menuContent()}
	<menu {id} class={menuClasses} data-testid={id}>
		{#if actor.groups.size === 1}
			{@render groupContent(actor.state)}
		{:else if actor.groups.size > 1}
			{#each actor.groups as [group, items] (group)}
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
