<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {PageRails} = ui.content
	const {Magic} = ui.blocks

	let pageContext = $derived({...page.data.pageContext, label: 'On this Page'})
	let title = 'Vital'
	let description = `Chlorophyll is Vital for photosynthesis`
</script>

<PageRails
	title=""
	{description}
	path={page.url.pathname}
	nav={page.data.nav}
	context={pageContext}
	layout="tram"
>
	{#snippet main()}
		<div class="l:frame justify:center">
			<Magic spell="vital" size="2xl" shape="round">
				<span
					class="font:h1 font:2xl svg:lotus size:2xl l:stack align:between justify:baseline"
				>
					<div class="text:center">
						<h1>{title}</h1>
					</div>
				</span>
			</Magic>
		</div>
	{/snippet}
</PageRails>
