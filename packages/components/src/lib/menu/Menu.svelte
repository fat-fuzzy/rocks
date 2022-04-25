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

	const handleClick = (event) => {
		const element = event.target
		dispatch('input', {
			animationId: element.getAttribute('id'),
		})
	}
</script>

<menu data-test="menu" class="l-stack">
	{#each menumItems as { name, emoji, id }}
		<button class:primary={id === animationId} on:click={handleClick} {id} data-test={id}>
			<!--TODO: make routes for animations-->
			{getLabel(emoji, name)}
		</button>
	{/each}
</menu>
