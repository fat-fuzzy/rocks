<script lang="ts">
	import {createEventDispatcher} from 'svelte'
	import {clickOutside} from '../../utils/click-outside.js'

	const dispatch = createEventDispatcher()
	export let layout = 'stack'
	export let size = 'md'
	export let variant = 'primary'
	export let alignment = 'start'
	export let items: {id: string; title: string; emoji: string}[] = []

	let selected = ''
	function getLabel(emoji, title) {
		return `${emoji} ${title}`
	}

	let expanded = false

	function toggleReveal(event) {
		expanded = !expanded
	}

	function handleClickOutside(event) {
		expanded = false
	}

	const handleClick = (event) => {
		const element = event.target
		selected = element.getAttribute('id')
		dispatch('input', {
			selected,
		})
	}
	$: show = expanded ? 'show' : 'hide'
</script>

<menu class={`l-reveal l-${layout} ${size}`} use:clickOutside on:clickOutside={handleClickOutside}>
	<button
		type="button"
		class={`toggle collapse  ${size} ${variant}`}
		aria-expanded={expanded}
		on:click={toggleReveal}
	>
		👾 Scenes
	</button>
	<div class={`${alignment} ${show}`}>
		<menu class={`l-${layout} ${size} card layer`}>
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
