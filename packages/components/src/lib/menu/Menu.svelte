<script>
	import {createEventDispatcher} from 'svelte'
	import {animations, currentAnimationId} from '../../stores.js'

	const dispatch = createEventDispatcher()
	let menumItems = []

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

	let animationsMenuExpanded = false

	function toggleAnimationsMenu(event) {
		animationsMenuExpanded = !animationsMenuExpanded
	}

	const handleClick = (event) => {
		const element = event.target
		dispatch('input', {
			animationId: element.getAttribute('id'),
		})
	}
	$: animationsMenuClass = animationsMenuExpanded ? 'l-stack md show left' : 'l-stack md hide'
</script>

<form class="dropdown sm">
	<button
		type="button"
		class="toggle collapse primary"
		aria-expanded={animationsMenuExpanded}
		on:click={toggleAnimationsMenu}
	>
		➕ Scenes
	</button>
	<menu class={animationsMenuClass}>
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
</form>
