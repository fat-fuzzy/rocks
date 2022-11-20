<script lang="ts">
	import {createEventDispatcher} from 'svelte'
	import {clickOutside} from '../../utils/click-outside.js'

	const dispatch = createEventDispatcher()
	export let layout = `l-stack`
	export let size = `sm`
	export let variant = `primary`
	export let menuItems: {id: string; title: string; emoji: string}[] = []

	let selected = ''
	function getLabel(emoji, title) {
		return `${emoji} ${title}`
	}

	let menuExpanded = false

	function toggleDropdown(event) {
		menuExpanded = !menuExpanded
	}

	function handleClickOutside(event) {
		menuExpanded = false
	}

	const handleClick = (event) => {
		const element = event.target
		selected = element.getAttribute('id')
		dispatch('input', {
			selected,
		})
	}
	$: show = menuExpanded ? `show left` : `hide`
</script>

<div class="dropdown">
	<menu class={`${layout} ${size}`} use:clickOutside on:click_outside={handleClickOutside}>
		<button
			type="button"
			class={`toggle collapse ${variant}`}
			aria-expanded={menuExpanded}
			on:click={toggleDropdown}
		>
			👾 Scenes
		</button>
		<div class={show}>
			<menu class={`${layout} ${size}`}>
				{#each menuItems as { title, emoji, id }}
					<button
						type="button"
						class:outline={id === selected}
						on:click={handleClick}
						{id}
						data-test={id}
					>
						<!--TODO: make routes for animations-->
						{getLabel(emoji, title)}
					</button>
				{/each}
			</menu>
		</div>
	</menu>
</div>
