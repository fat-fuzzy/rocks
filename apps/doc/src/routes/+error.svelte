<script lang="ts">
	import {page} from '$app/stores'

	import {headless, blocks} from '@fat-fuzzy/ui-s5'

	const {Head} = headless
	const {Feedback} = blocks

	let title = $derived(`Error: ${$page.status}`)
	let asset = $derived(String($page.status))
	let status = $derived(String($page.status))
	let message = $derived($page.error?.message)
</script>

<Head {title} description="Something went wrong!" />

<div class="l:center:2xs card:2xl maki:block:xl">
	<Feedback {asset} {status} context="prose" size="lg" container="center">
		<p>{message}</p>
	</Feedback>
</div>
