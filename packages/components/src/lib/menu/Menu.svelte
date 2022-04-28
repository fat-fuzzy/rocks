<script>
	import {createEventDispatcher} from 'svelte'
	import {animations, currentAnimationId} from '../../stores.js'

	const dispatch = createEventDispatcher()
	export let layout = `l-stack`
	export let size = `sm`
	export let variant = `primary`
	export let menumItems = []

	let animationId = $currentAnimationId

	function getLabel(emoji, name) {
		return `${emoji} ${name}`
	}

	animations.subscribe((value) => {
		menumItems = value
	})

	currentAnimationId.subscribe((value) => {
		animationId = value
	})

	let menuExpanded = false

	function toggleAnimationsMenu(event) {
		menuExpanded = !menuExpanded
	}

	const handleClick = (event) => {
		const element = event.target
		dispatch('input', {
			animationId: element.getAttribute('id'),
		})
	}
	$: show = menuExpanded ? `show left` : `hide`
</script>

<menu class="dropdown sm">
	<button
		type="button"
		class={`toggle collapse ${variant}`}
		aria-expanded={menuExpanded}
		on:click={toggleAnimationsMenu}
	>
		👾 Scenes
	</button>
	<menu class={`${layout} ${size} ${show}`}>
		{#each menumItems as { name, emoji, id }}
			<button
				type="button"
				class:outline={id === animationId}
				on:click={handleClick}
				{id}
				data-test={id}
			>
				<!--TODO: make routes for animations-->
				{getLabel(emoji, name)}
			</button>
		{/each}
	</menu>
</menu>
