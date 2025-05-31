<script lang="ts">
	import {page} from '$app/state'
	import '$lib/styles/css/main.css'
	import ui from '@fat-fuzzy/ui'

	const {Feedback, Magic} = ui.blocks
	const {Head} = ui.headless
	const {Burrito} = ui.layouts

	let title = $derived(`Fat Fuzzy ${page.status}`)
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

<Head {title} description={`Details page for media: ${title}`} />

<main id="main" class="ravioli:2xl maki:block:xl">
	<Burrito {title} {description} size="3xl">
		<Feedback {asset} {status} context="prose" size="2xl" container="taco">
			<div class="l:stack:lg">
				<p>{page.status}: {message}</p>
				<div class="l:switcher:xs">
					<button
						class="variant:fill bg:danger size:lg emoji:point-left"
						onclick={() => history.back()}
					>
						Back
					</button>

					<Magic spell="fuzzy" size="md" circle="dotted" mask="text">
						<div class="l:flex align:center justify:center">
							<ff-icon class="emoji:home font:lg"></ff-icon>
							<a class="font:h1" href="/"> Home </a>
						</div>
					</Magic>
				</div>
			</div>
		</Feedback>
	</Burrito>
</main>
