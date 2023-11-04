<script lang="ts">
	import {createEventDispatcher} from 'svelte'
	import Button from '$lib/components/blocks/buttons/Button.svelte'

	const dispatch = createEventDispatcher()
	export let id = 'button-menu'
	export let title = ''
	export let size = ''
	export let breakpoint = ''
	export let layout = 'switcher'
	export let container = 'card'
	export let color = ''
	export let variant = ''
	export let asset = ''
	export let formaction = 'enter'
	export let page = ''
	export let items: any = [] // TODO Fix type

	let menuId = id

	export let onClick = (event: MouseEvent) => {
		const payload = {
			clicked: event.target?.id || undefined,
			text: event.target?.textContent || undefined,
		}
		window.alert(`${payload.text} Clicked`)
		dispatch('click', payload)
	}
</script>

{#if title}
	<div class={`menu l:stack:${size}`}>
		<p>{title}</p>
		<menu id={menuId} class={`l:${layout} ${container}:${size} bp:${breakpoint} ${size}`}>
			{#each items as button}
				{@const itemColor = button.color ?? color}
				{@const itemVariant = button.variant ?? variant}
				{@const itemSize = button.size ?? size}
				{@const itemAsset = button.asset ?? asset}
				<li>
					<Button
						{onClick}
						name={menuId}
						{page}
						{formaction}
						{...button}
						color={itemColor}
						variant={itemVariant}
						size={itemSize}
						asset={itemAsset}
					/>
				</li>
			{/each}
		</menu>
	</div>
{:else}
	<menu id={menuId} class={`l:${layout} ${container}:${size} bp:${breakpoint} ${size}`}>
		{#each items as button}
			{@const itemColor = button.color ?? color}
			{@const itemVariant = button.variant ?? variant}
			{@const itemSize = button.size ?? size}
			{@const itemAsset = button.asset ?? asset}
			<li>
				<Button
					{onClick}
					name={menuId}
					{page}
					{formaction}
					{...button}
					color={itemColor}
					variant={itemVariant}
					size={itemSize}
					asset={itemAsset}
				/>
			</li>
		{/each}
	</menu>
{/if}
