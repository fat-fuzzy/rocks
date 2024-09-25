<script lang="ts">
	import {page} from '$app/stores'
	import '$lib/styles/css/main.css'
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
	let message = $derived($page.error?.message ?? 'An error occurred')
</script>

<PageMain
	title={String(title)}
	{description}
	size="xl"
	pageName={String($page.status)}
	justify="center"
>
	{#snippet header()}
		<div class="surface:0:neutral w:full">
			<h1 class="card:sm text:center">Fat Fuzzy {title}</h1>
		</div>
	{/snippet}
	<div class="l:center:2xs card:2xl maki:block:xl">
		<Feedback {asset} {status} context="prose" size="lg" container="center">
			<p>{message}</p>
			<button class={`variant:outline bg:danger:500 size:md`} onclick={()=>history.back()}>Go Back</button>
		</Feedback>
	</div>
</PageMain>
