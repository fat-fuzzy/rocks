<script lang="ts">
	import {page} from '$app/stores'

	import {headless, blocks} from '@fat-fuzzy/ui-s5'

	const {Head} = headless
	const {Feedback} = blocks

	let title = $derived(`Error: ${$page.status}`)
	let status = $state('error')
	let asset = $derived.by(() => {
		switch ($page.status) {
			case 404:
				return 'not-found'
			default:
				return 'error'
		}
	})
	let message = $derived(`${$page.status}: ${$page.error?.message}`)
</script>

<Head {title} description="Something went wrong!" />

<div class="l:center:2xs card:2xl maki:block:xl">
	<Feedback {asset} {status} context="prose" size="lg" container="center">
		<p>{message}</p>
	</Feedback>
</div>
