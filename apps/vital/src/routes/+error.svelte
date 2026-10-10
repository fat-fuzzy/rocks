<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {Feedback} = ui.blocks
	const {Head} = ui.headless
	const {Burrito} = ui.layouts

	let title = $derived(`Vital | ${page.status}`)
	let message = $derived(page.error?.message ?? 'Something went wrong!')
</script>

<Head title="" pageName={String(page.status)} description={message} />

<main id="main" class="ravioli:2xl maki:block:xl">
	<Burrito {title} size="3xl">
		<Feedback context="prose" asset="none" size="lg" container="taco">
			<div class="l:stack:lg">
				<p>{page.status}: {message}</p>
				<div class="l:switcher:xs">
					<button
						class="font:heading justify:between variant:outline bg:primary size:md"
						onclick={() => history.back()}
					>
						<ff-icon class="svg:chevron-left"></ff-icon>
						Back
					</button>
					<a
						class="l:switcher:xs variant:fill surface:0:neutral align:center justify:between shape:mellow font:heading font:md ravioli:3xs grow"
						href="/"
					>
						<span class="maki:inline:sm"> Home</span>
						<ff-icon class="svg:lotus font:lg justify:end"></ff-icon>
					</a>
				</div>
			</div>
		</Feedback>
	</Burrito>
</main>
