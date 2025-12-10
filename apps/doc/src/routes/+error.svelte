<script lang="ts">
	import type {UiStatus} from '@fat-fuzzy/ui'
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {Feedback, Magic} = ui.blocks
	const {Head} = ui.headless
	const {Burrito} = ui.layouts

	let title = $derived(`Fat Fuzzy ${page.status}`)
	let status: UiStatus = $state('error')
	let asset = $derived.by(() => {
		switch (page.status) {
			case 404:
				return 'not-found'
			default:
				return 'error'
		}
	})
	let message = $derived(page.error?.message ?? 'Something went wrong!')
</script>

<Head title="" pageName={String(page.status)} description={message} />

<main id="main" class="ravioli:2xl maki:block:xl">
	<Burrito {title} size="3xl">
		<Feedback {asset} {status} context="prose" size="2xl" container="taco">
			<div class="l:stack:lg">
				<p>{page.status}: {message}</p>
				<div class="l:switcher:xs">
					<button
						class="variant:fill bg:danger size:lg emoji:point-left justify:start"
						onclick={() => history.back()}
					>
						Back
					</button>

					<Magic
						spell="fuzzy"
						size="3xs"
						circle="dotted"
						mask="text"
						shape="mellow"
					>
						<div class="l:flex align:center">
							<ff-icon class="emoji:home font:lg justify:center"></ff-icon>
							<a class="font:h1 font:lg maki:inline size:2xs" href="/">
								Home
							</a>
						</div>
					</Magic>
				</div>
			</div>
		</Feedback>
	</Burrito>
</main>
