<script lang="ts">
	import {page} from '$app/stores'

	import {headless} from '@fat-fuzzy/ui-s5'
	import {api} from '@fat-fuzzy/playbook'

	const {Head} = headless

	let category = $derived($page.params.category)
	let title = $derived($page.params.component)
	let markdowns = $derived(
		$page.data.markdowns && $page.data.markdowns[category]
			? $page.data.markdowns[category]
			: [],
	)
	let content = $derived(
		markdowns.find(({meta}) => meta.title === title) || {
			html: `<p class="feedback bare emoji:default">Doc Coming Soon!</p>`,
		},
	)
	let headerClass = `l:grid:header:doc bp:xs bg:polar`
	let props = $derived(
		content.meta ? api.props.getElementProps(content.meta) : {},
	)
</script>

<Head {title} page="UI" description={`${title} Doc`} />

<header class={headerClass}>
	<h1 class="main">{title} | Doc</h1>
</header>

<article class="l:sidebar:xs">
	<section class="l:main card:md">
		<div class="l:text:lg">{@html content.html}</div>
	</section>
	<aside class="l:side">
		{#if content?.meta?.props_style}
			<details open>
				<summary class={`bg:primary:light box:primary:light`}>
					Style Props
				</summary>
				<ul class="tags l:switcher:md">
					{#if props.doc}
						{#each props.doc as docs}
							{#if docs.tokens}
								{#each docs.tokens as prop}
									<li class="card:sm bg:primary:lightest">{prop}</li>
								{/each}
							{/if}
							{#if docs.blocks}
								{#each docs.blocks as prop}
									<li class="card:sm bg:primary:lightest">{prop}</li>
								{/each}
							{/if}
							{#if docs.layouts}
								{#each docs.layouts as prop}
									<li class="card:sm bg:primary:lightest">{prop}</li>
								{/each}
							{/if}
						{/each}
					{/if}
				</ul>
			</details>
		{/if}
		{#if content?.meta?.content_type}
			<details open>
				<summary class={`bg:primary:light box:primary:light`}>
					Content Type
				</summary>
				<ul class="tags l:switcher:md">
					{#each content?.meta?.content_type as prop}
						<li class="card:sm bg:highlight:lightest">{prop}</li>
					{/each}
				</ul>
			</details>
		{/if}
		{#if content?.meta?.props_state}
			<details open>
				<summary class={`bg:primary:light box:primary:light`}>
					State Props
				</summary>
				<ul class="tags l:switcher:md">
					{#each content?.meta?.props_state as prop}
						<li class="card:sm bg:accent:lightest">{prop}</li>
					{/each}
				</ul>
			</details>
		{/if}
	</aside>
</article>
