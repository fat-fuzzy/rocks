<script lang="ts">
	import {createEventDispatcher} from 'svelte'
	import {clickOutside} from '../../utils/click-outside.js'

	const dispatch = createEventDispatcher()
	export let layout = 'stack'
	export let size = 'sm'
	export let variant = 'primary'
	export let items: {id: string; title: string; emoji: string}[] = []

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
	$: show = menuExpanded ? 'show left' : 'hide'
</script>

<div class="l-reveal">
	<menu class={`l-${layout} ${size}`} use:clickOutside on:clickOutside={handleClickOutside}>
		<button
			type="button"
			class={`md toggle collapse ${variant}`}
			aria-expanded={menuExpanded}
			on:click={toggleDropdown}
		>
			👾 Scenes
		</button>
		<div class={show}>
			<menu class={`l-${layout} ${size}`}>
				{#each items as { title, emoji, id }}
					<button
						type="button"
						class:outline={id === selected}
						class="md"
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
