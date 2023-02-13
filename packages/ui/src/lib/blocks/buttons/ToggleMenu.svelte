<script lang="ts">
	import Toggle from '../buttons/Toggle.svelte'
	import {createEventDispatcher} from 'svelte'
	import mocks from '../../../data/mocks'

	const dispatch = createEventDispatcher()

	export let id = 'toggle-menu'
	export let title = ''
	export let size = ''
	export let breakpoint = ''
	export let layout = 'switcher'
	export let color = ''
	export let variant = ''
	export let multiple = false
	export let items = mocks.toggleMenu.map((button) => ({...button, id: `${id}.${button.id}`}))
	export let formaction = 'update'
	export let page = ''

	const menuId = id
	let selected: {id: string; pressed: boolean; send: (event: string) => unknown}[] = []

	const onClick = (event: MouseEvent) => {
		if (multiple) {
			if (event.detail.pressed) {
				selected = [...selected, event.detail]
			} else {
				selected = selected.filter((c) => c.id !== event.detail.id)
			}
		} else {
			if (event.detail.pressed) {
				selected.map((c) => {
					if (c.id !== event.detail.id && c.pressed) {
						c.send('TOGGLE')
					}
				})
			}
			selected = [event.detail]
		}
		dispatch('click', {
			selected,
		})
	}
</script>

{#if title}
	<div class={`menu l:stack`}>
		<p>{title}</p>
		<menu id={menuId} class={`l:${layout} ${size} bp:${breakpoint}`}>
			{#each items as toggleProps}
				{@const itemColor = toggleProps.color ?? color}
				{@const itemVariant = toggleProps.variant ?? variant}
				<li>
					<Toggle
						on:click={onClick}
						name={menuId}
						{formaction}
						{page}
						{...toggleProps}
						color={itemColor}
						variant={itemVariant}
					/>
				</li>
			{/each}
		</menu>
	</div>
{:else}
	<menu id={menuId} class={`l:${layout} ${size} bp:${breakpoint}`}>
		{#each items as toggleProps}
			{@const itemColor = toggleProps.color ?? color}
			{@const itemVariant = toggleProps.variant ?? variant}
			<li>
				<Toggle
					on:click={onClick}
					name={menuId}
					{formaction}
					{page}
					{...toggleProps}
					color={itemColor}
					variant={itemVariant}
				/>
			</li>
		{/each}
	</menu>
{/if}
