<script lang="ts">
	import {page} from '$app/stores'

	import ui from '@fat-fuzzy/ui'

	const {Feedback} = ui.blocks
	const {PageMain} = ui.content

	let title = $derived($page.status)
	let status = $state('error')
	let asset = $derived.by(() => {
		switch ($page.status) {
			case 404:
				return 'not-found'
			default:
				return 'error'
		}
	})
	let description = 'Something went wrong!'
	let message = $derived(`${$page.status}: ${$page.error?.message}`)
</script>

<PageMain
	{title}
	{description}
	size="xl"
	pageName={String($page.status)}
	justify="center"
>
	<div class="l:center:2xs card:2xl maki:block:xl">
		<Feedback {asset} {status} context="prose" size="lg" container="center">
			<p>{message}</p>
		</Feedback>
	</div>
</PageMain>
