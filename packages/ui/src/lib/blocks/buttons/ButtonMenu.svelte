<script lang="ts">
	import {browser} from '$app/environment'
	import {createEventDispatcher} from 'svelte'
	import format from '../../utils/format'
	import Button from '../buttons/Button.svelte'
	import fixtures from '../../../data/fixtures'

	const dispatch = createEventDispatcher()
	export let layout = 'switcher'
	export let size = ''
	export let breakpoint = 'md'
	export let color = ''
	export let variant = ''
	export let id = 'btn-menu'

	export let items: {
		id: string
		label: string
		type: string
		icon?: string
		disabled?: boolean
	}[] = fixtures.menu

	let clicked = ''
	let menuId = id

	export let onClick = (event) => {
		if (browser) {
			window.alert(`${event.target.textContent} Clicked`)
		}
		clicked = event.target.id
		dispatch('click', {
			clicked,
		})
	}
</script>

<menu id={menuId} class={`l-${layout} ${size} bp:${breakpoint}`}>
	{#each items as { id, label, icon }}
		<li>
			<Button id={`${menuId}-${id}`} {onClick} {variant} {color}>
				{format.formatLabel(label, icon)}
			</Button>
		</li>
	{/each}
</menu>
