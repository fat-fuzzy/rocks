<script lang="ts">
	export let layout = 'stack'
	export let size = 'md'
	export let variant = 'box'
	export let color = 'default'

	$: cardClasses = `card ${size} l:${layout} ${color} ${variant}`
</script>

<article class={cardClasses}>
	<header>
		<slot name="header" />
	</header>
	<main>
		<slot name="main" />
	</main>
	<footer>
		<slot name="footer" />
	</footer>
</article>
