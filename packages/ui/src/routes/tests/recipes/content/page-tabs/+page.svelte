<script lang="ts">
	import {page} from '$app/state'

	import PageTabs from '$lib/components/recipes/content/PageTabs.svelte'

	const TABS = [
		{
			slug: 'tab-1',
			id: 'tab-1',
			title: 'Tab 1',
			initial: true,
			header: header1,
			content: content1,
		},
		{
			slug: 'tab-2',
			id: 'tab-2',
			title: 'Tab 2',
			initial: true,
			header: header2,
			content: content2,
		},
	]
</script>

{#snippet header1()}
	<p class="l:frame:twin ravioli:2xl font:heading surface:1:primary">
		Header 1
	</p>
{/snippet}

{#snippet content1()}
	<p class="l:frame:twin ravioli:2xl font:heading surface:1:primary">
		Content 1
	</p>
{/snippet}

{#snippet header2()}
	<p class="l:frame:twin ravioli:2xl font:heading surface:1:accent">Header 1</p>
{/snippet}

{#snippet content2()}
	<p class="l:frame:twin ravioli:2xl font:heading surface:1:accent">
		Content 2
	</p>
{/snippet}

<PageTabs
	id="test-page-tabs"
	title="Test PageTabs"
	description="A page layout with Tabs pattern https://www.w3.org/WAI/ARIA/apg/patterns/tabs/"
	path={page.url.pathname}
	tabs={TABS}
/>
