<script lang="ts">
	import {PageMain} from '@fat-fuzzy/ui'

	const title = 'Fat Fuzzy Play'
	const description =
		'A sandbox environment to experiment and learn web-based computer graphics.'
</script>

<PageMain {title} {description}>
	{#snippet header()}
		<h1 class="l:side hug maki:block:md">{title}</h1>
	{/snippet}
</PageMain>
