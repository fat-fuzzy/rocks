<script lang="ts">
	import {createEventDispatcher} from 'svelte'
	import {clickOutside} from '../../utils/click-outside.js'

	const dispatch = createEventDispatcher()
	export let layout = 'stack'
	export let size = 'md'
	export let variant = 'primary'
	export let alignment = 'start'
	export let items: {slug: string; title: string; emoji: string}[] = []

	let selected = ''

	const formatText = (emoji, title) => {
		return `${emoji} ${title}`
	}

	let expanded = false

	const toggleReveal = (event) => {
		expanded = !expanded
	}

	const handleClickOutside = (event) => {
		expanded = false
	}

	export let onClick = (event) => {
		const element = event.target
		selected = element.getAttribute('id')
		dispatch('click', {
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
			{#each items as { title, emoji, slug }}
				<button
					type="button"
					class:outline={slug === selected}
					class="md"
					on:click={onClick}
					id={slug}
					data-test={slug}
				>
					{formatText(emoji, title)}
				</button>
			{/each}
		</menu>
	</div>
</menu>
