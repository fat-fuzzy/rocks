<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {PageRails} = ui.content
	const {Magic} = ui.blocks

	let pageContext = $derived({...page.data.pageContext, label: 'On this Page'})
	let title = 'Chlorophyll is Vital'
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
		<div class="l:frame maki:block:2xl justify:center">
			<Magic spell="chlorophyll" size="2xl" shape="round">
				<span
					class="font:h1 font:2xl svg:lotus size:2xl l:stack align:between justify:baseline"
				>
					<div class="maki:block text:center">
						<h1 class="l:inline color:accent">{title}</h1>
					</div>
				</span>
			</Magic>
		</div>
	{/snippet}
</PageRails>
