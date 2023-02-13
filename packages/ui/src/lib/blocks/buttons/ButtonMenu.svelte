<script lang="ts">
	import {browser} from '$app/environment'
	import {createEventDispatcher} from 'svelte'
	import Button from '../buttons/Button.svelte'
	import mocks from '../../../data/mocks'

	const dispatch = createEventDispatcher()
	export let id = 'menu'
	export let title = ''
	export let size = ''
	export let breakpoint = ''
	export let layout = 'switcher'
	export let color = ''
	export let variant = ''
	export let items = mocks.menu.map((button) => ({...button, id: `${id}.${button.id}`}))
	export let formaction = 'enter'
	export let page = ''

	let clicked = ''
	let menuId = id

	export let onClick = (event: MouseEvent) => {
		if (browser) {
			window.alert(`${event.target.textContent} Clicked`)
		}
		clicked = event.target.id
		dispatch('click', {
			clicked,
		})
	}
</script>

{#if title}
	<div class={`menu l:stack ${size}`}>
		<p>{title}</p>
		<menu id={menuId} class={`l:${layout} ${size} bp:${breakpoint}`}>
			{#each items as buttonProps}
				{@const itemColor = buttonProps.color ?? color}
				{@const itemVariant = buttonProps.variant ?? variant}
				<li>
					<Button
						{onClick}
						name={menuId}
						{page}
						{formaction}
						{...buttonProps}
						color={itemColor}
						variant={itemVariant}
					/>
				</li>
			{/each}
		</menu>
	</div>
{:else}
	<menu id={menuId} class={`l:${layout} ${size} bp:${breakpoint}`}>
		{#each items as buttonProps}
			{@const itemColor = buttonProps.color ?? color}
			{@const itemVariant = buttonProps.variant ?? variant}
			<li>
				<Button
					{onClick}
					name={menuId}
					{page}
					{formaction}
					{...buttonProps}
					color={itemColor}
					variant={itemVariant}
				/>
			</li>
		{/each}
	</menu>
{/if}
