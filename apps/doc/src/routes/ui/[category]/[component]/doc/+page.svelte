<script lang="ts">
	import {content} from '@fat-fuzzy/ui-s5'
	import {page} from '$app/stores'

	import {api} from '@fat-fuzzy/playbook'

	const {PageMain} = content

	let category = $derived($page.params.category)
	let title = $derived($page.params.component)
	let description = $derived(`${title} | Doc`)
	let markdowns = $derived(
		$page.data.markdowns && $page.data.markdowns[category]
			? $page.data.markdowns[category]
			: [],
	)
	let markdownContent = $derived(
		markdowns.find(({meta}) => meta.title === title) || {
			html: `<p class="feedback bare emoji:default">Doc Coming Soon!</p>`,
		},
	)
	let props = $derived(
		markdownContent.meta ? api.props.getElementProps(markdownContent.meta) : {},
	)
</script>

<PageMain {title} {description}>
	<article class="l:sidebar:xs">
		<section class="l:main card:md">
			<div class="l:text:lg">{@html markdownContent.html}</div>
		</section>
		<aside class="l:side">
			{#if markdownContent?.meta?.props_style}
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
			{#if markdownContent?.meta?.content_type}
				<details open>
					<summary class={`bg:primary:light box:primary:light`}>
						Content Type
					</summary>
					<ul class="tags l:switcher:md">
						{#each markdownContent?.meta?.content_type as prop}
							<li class="card:sm bg:highlight:lightest">{prop}</li>
						{/each}
					</ul>
				</details>
			{/if}
			{#if markdownContent?.meta?.props_state}
				<details open>
					<summary class={`bg:primary:light box:primary:light`}>
						State Props
					</summary>
					<ul class="tags l:switcher:md">
						{#each markdownContent?.meta?.props_state as prop}
							<li class="card:sm bg:accent:lightest">{prop}</li>
						{/each}
					</ul>
				</details>
			{/if}
		</aside>
	</article>
</PageMain>
