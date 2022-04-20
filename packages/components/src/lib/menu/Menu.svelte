<script>
	import {createEventDispatcher} from 'svelte'
	import {animations} from '../../stores.js'

	const dispatch = createEventDispatcher()
	let menumItems = []

	function getLabel(emoji, name) {
		return `${emoji} ${name}`
	}
	animations.subscribe((value) => {
		menumItems = value
	})

	const handleClick = (event) => {
		const element = event.target
		dispatch('input', {
			animationId: element.getAttribute('id'),
		})
	}
</script>

<nav data-test="nav" class="nav">
	<ul class="l-stack sm">
		{#each menumItems as { name, emoji, id, type }}
			<li>
				<button class="btn-menu {type}" on:click={handleClick} {id} data-test={id}>
					<!--TODO: make routes for animations-->
					{getLabel(emoji, name)}
				</button>
			</li>
		{/each}
	</ul>
</nav>

<style lang="scss">
	@import '../../styles/main.scss';
</style>
