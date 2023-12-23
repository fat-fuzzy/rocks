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
	export let mode = 'radio'
	export let formaction: string | undefined = undefined
	export let items: any = [] // TODO fix types

	let selected: {
		id: string
		value: string
		pressed: boolean
		name: string
		send: (event: string) => unknown
	}[] = []

	const onClick = (event: CustomEvent) => {
		let toggleValue = selected.find((c) => {
			c.name === event.detail.id
		})
		switch (mode) {
			case 'multiple':
				if (event.detail.pressed) {
					selected = [...selected, event.detail]
				} else {
					selected = selected.filter((c) => c.name !== event.detail.id)
				}
				break
			case 'radio':
				if (event.detail.pressed) {
					if (toggleValue) {
						selected = [toggleValue]
					}
					selected.map((c) => {
						if (c.name !== event.detail.id && c.pressed) {
							c.send('TOGGLE')
						}
					})
				}
				selected = [event.detail]
				break
			default:
				break
		}

		dispatch('click', {
			selected,
		})
	}

	$: type = formaction ? 'submit' : 'button'
	$: containerClass = container ? `${container}:${size}` : ''
</script>

{#if title}
	<div class={`menu l:stack ${size} ${containerClass}`}>
		<p>{title}</p>
		<menu {id} class={`l:${layout}:${size} th:${threshold} ${size} mode:${mode}`}>
			{#each items as props}
				{@const itemColor = props.color ?? color}
				{@const itemVariant = props.variant ?? variant}
				{@const itemSize = props.size ?? size}
				{@const itemAsset = props.asset ?? asset}
				<li>
					<Toggle
						id={`${id}-${props.id}`}
						on:click={onClick}
						{type}
						{formaction}
						{...props}
						color={itemColor}
						variant={itemVariant}
						size={itemSize}
						asset={itemAsset}
						disabled={mode === 'radio' && selected[0]?.value === props.value ? true : false}
					/>
				</li>
			{/each}
		</menu>
	</div>
{:else}
	<menu {id} class={`l:${layout}:${size} ${containerClass} th:${threshold} ${size} mode:${mode}`}>
		{#each items as props}
			{@const itemColor = props.color ?? color}
			{@const itemVariant = props.variant ?? variant}
			{@const itemSize = props.size ?? size}
			{@const itemAsset = props.asset ?? asset}
			<li>
				<Toggle
					id={`${id}-${props.id}`}
					on:click={onClick}
					{type}
					{formaction}
					{...props}
					color={itemColor}
					variant={itemVariant}
					size={itemSize}
					asset={itemAsset}
					disabled={mode === 'radio' && selected[0]?.value === props.value ? true : false}
				/>
			</li>
		{/each}
	</menu>
{/if}
