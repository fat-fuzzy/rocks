<script lang="ts">
	import Toggle from '$lib/components/blocks/buttons/Toggle.svelte'
	import {createEventDispatcher} from 'svelte'

	const dispatch = createEventDispatcher()

	export let id = 'toggle-menu'
	export let title = ''
	export let size = ''
	export let breakpoint = ''
	export let layout = 'switcher'
	export let color = ''
	export let variant = ''
	export let multiple = false
	export let formaction = 'update'
	export let page = ''
	export let items: any = [] // TODO fix types

	let menuId = id
	let selected: {id: string; pressed: boolean; send: (event: string) => unknown}[] = []

	const onClick = (event: CustomEvent) => {
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
	<div class={`menu l:stack ${size}`}>
		<p>{title}</p>
		<menu id={menuId} class={`l:${layout} bp:${breakpoint} ${size}`}>
			{#each items as toggle}
				{@const itemColor = toggle.color ?? color}
				{@const itemVariant = toggle.variant ?? variant}
				{@const itemSize = toggle.size ?? size}
				<li>
					<Toggle
						on:click={onClick}
						name={toggle.value}
						{formaction}
						{page}
						{...toggle}
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
		{#each items as toggle}
			{@const itemColor = toggle.color ?? color}
			{@const itemVariant = toggle.variant ?? variant}
			{@const itemSize = toggle.size ?? size}
			<li>
				<Toggle
					on:click={onClick}
					name={toggle.value}
					{formaction}
					{page}
					{...toggle}
					color={itemColor}
					variant={itemVariant}
					size={itemSize}
				/>
			</li>
		{/each}
	</menu>
{/if}
