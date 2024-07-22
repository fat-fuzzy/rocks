<script lang="ts">
	import {page} from '$app/stores'

	import {headless} from '$lib'

	const {Head} = headless

	let title = 'Error'

	$: asset = $page.status === 404 ? 'not-found' : 'error'
</script>

<Head page="Error" description="Something went wrong!" />

<div class="l:frame:twin">
	<div class="l:stack:xxl card:xxl l:text:lg">
		<h1>Fat Fuzzy {title}</h1>
		<p class={`feedback emoji:${asset} font:md`}>{$page.status}: {$page.error?.message}</p>
	</div>
</div>
