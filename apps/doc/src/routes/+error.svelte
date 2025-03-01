<script lang="ts">
	import {page} from '$app/state'
	import '$lib/styles/css/main.css'
	import ui from '@fat-fuzzy/ui'

	const {Feedback} = ui.blocks
	const {PageMain} = ui.content

	let title = $derived(page.status)
	let status = $state('error')
	let asset = $derived.by(() => {
		switch (page.status) {
			case 404:
				return 'not-found'
			default:
				return 'error'
		}
	})
	let description = 'Something went wrong!'
	let message = $derived(page.error?.message ?? 'An error occurred')
</script>

<PageMain
	title={`Fat Fuzzy ${title}`}
	{description}
	pageName={String(page.status)}
>
	<div class="l:taco:2xs ravioli:2xl maki:block:xl">
		<Feedback {asset} {status} context="prose" size="lg" container="taco">
			<div class="l:stack:md">
				<p>{message}</p>
				<div class="l:switcher:xs">
					<button
						class={`variant:fill bg:accent:500 size:sm`}
						onclick={() => history.back()}
					>
						Back
					</button>
					<a
						class={`variant:outline bg:primary:500 ravioli:xs font:sm`}
						href="/"
					>
						Home
					</a>
				</div>
			</div>
		</Feedback>
	</div>
</PageMain>
