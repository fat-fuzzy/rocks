<script lang="ts">
	// import {browser} from '$app/environment'
	import {createEventDispatcher} from 'svelte'
	import Button from '$lib/components/blocks/buttons/Button.svelte'
	import mocks from '$lib/data/mocks'

	const dispatch = createEventDispatcher()
	export let id = 'button-menu'
	export let title = ''
	export let size = ''
	export let breakpoint = ''
	export let layout = 'switcher'
	export let color = ''
	export let variant = ''
	export let formaction = 'enter'
	export let page = ''
	export let items = mocks.menu.map((button) => ({...button, id: `${id}.${button.id}`}))

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
		<menu id={menuId} class={`l:${layout} bp:${breakpoint} ${size}`}>
			{#each items as button}
				{@const itemColor = button.color ?? color}
				{@const itemVariant = button.variant ?? variant}
				{@const itemSize = button.size ?? size}
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
					/>
				</li>
			{/each}
		</menu>
	</div>
{:else}
	<menu id={menuId} class={`l:${layout} bp:${breakpoint} ${size}`}>
		{#each items as button}
			{@const itemColor = button.color ?? color}
			{@const itemVariant = button.variant ?? variant}
			{@const itemSize = button.size ?? size}
			<li>
				<Button
					on:click={onClick}
					name={menuId}
					{page}
					{formaction}
					{...button}
					color={itemColor}
					variant={itemVariant}
					size={itemSize}
				/>
			</li>
		{/each}
	</menu>
{/if}
