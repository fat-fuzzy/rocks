<script lang="ts">
	import Toggle from '../buttons/Toggle.svelte'
	import {createEventDispatcher} from 'svelte'
	import fixtures from '../../../data/fixtures'

	const dispatch = createEventDispatcher()

	export let id = ''
	export let title = ''
	export let size = ''
	export let breakpoint = ''
	export let layout = 'switcher'
	export let color = ''
	export let variant = ''
	export let multiple = false
	export let items = fixtures.toggleMenu

	const menuId = id
	let selected: {id: string; pressed: boolean; send: (event: string) => unknown}[] = []

	export let onToggle = (event) => {
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
		dispatch('changed', {
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
					<Toggle on:toggle={onToggle} {...toggleProps} color={itemColor} variant={itemVariant} />
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
				<Toggle on:toggle={onToggle} {...toggleProps} color={itemColor} variant={itemVariant} />
			</li>
		{/each}
	</menu>
{/if}
