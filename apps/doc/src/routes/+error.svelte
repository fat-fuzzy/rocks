<script lang="ts">
	import {page} from '$app/state'
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
						class="variant:fill bg:danger size:lg emoji:point-left justify:start"
						onclick={() => history.back()}
					>
						Back
					</button>

					<Magic
						spell="fuzzy"
						size="2xs"
						circle="dotted"
						mask="text"
						shape="mellow"
					>
						<div class="l:flex align:center">
							<ff-icon class="emoji:home font:lg size:md justify:center"
							></ff-icon>
							<a class="font:h1 font:md maki:inline size:xs" href="/"> Home </a>
						</div>
					</Magic>
				</div>
			</div>
		</Feedback>
	</Burrito>
</main>
