<script lang="ts">
	import Toggle from '$lib/components/blocks/buttons/Toggle.svelte'
	import {createEventDispatcher} from 'svelte'

	const dispatch = createEventDispatcher()

	export let id = 'toggle-menu'
	export let title = ''
	export let size = ''
	export let threshold = ''
	export let layout = 'switcher'
	export let container = ''
	export let color = ''
	export let variant = ''
	export let asset = ''
	export let multiple = false
	export let formaction: string | undefined = undefined
	export let items: any = [] // TODO fix types

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
	$: type = formaction ? 'submit' : 'button'
</script>

{#if title}
	<div class={`menu l:stack ${size}`}>
		<p>{title}</p>
		<menu {id} class={`l:${layout}:${size} ${container}:${size} th:${threshold} ${size}`}>
			{#each items as props}
				{@const itemColor = props.color ?? color}
				{@const itemVariant = props.variant ?? variant}
				{@const itemSize = props.size ?? size}
				{@const itemAsset = props.asset ?? asset}
				<li>
					<Toggle
						on:click={onClick}
						{type}
						{formaction}
						{...props}
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
	<menu {id} class={`l:${layout} bp:${threshold} ${size}`}>
		{#each items as props}
			{@const itemColor = props.color ?? color}
			{@const itemVariant = props.variant ?? variant}
			{@const itemSize = props.size ?? size}
			{@const itemAsset = props.asset ?? asset}
			<li>
				<Toggle
					on:click={onClick}
					{type}
					{formaction}
					{...props}
					color={itemColor}
					variant={itemVariant}
					size={itemSize}
					asset={itemAsset}
				/>
			</li>
		{/each}
	</menu>
{/if}
