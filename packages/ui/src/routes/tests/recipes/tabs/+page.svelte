<script lang="ts">
	import {page} from '$app/state'

	import Tabs from '$lib/components/recipes/tabs/Tabs.svelte'

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
<Tabs id="test-tabs" path={page.url.pathname} tabs={TABS} />
