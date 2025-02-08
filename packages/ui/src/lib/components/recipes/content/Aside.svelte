<script lang="ts">
	import type {AsideProps} from '$types'
	import Feedback from '$lib/components/blocks/global/Feedback.svelte'

	let {created, updated, series, children, page}: AsideProps = $props()

	let colorClass = 'surface:1:primary'
	let publishedIcon = updated !== created ? 'outdated' : 'published'
</script>

<aside class="l:side l:stack:md justify:end">
	{#if updated && created}
		<div class="l:burrito:lg">
			<Feedback
				status="default"
				variant="bare"
				size="sm"
				context="prose"
				asset="none"
				container="stack"
			>
				<p class="l:flex justify:between">
					<span class={`emoji:${publishedIcon}`}>Published</span>
					<span class="maki:inline">{created}</span>
				</p>
				{#if updated !== created}
					<p class="l:flex justify:between">
						<span class="emoji:updated">Updated</span>
						<span class="maki:inline">{updated}</span>
					</p>
				{/if}
			</Feedback>
		</div>
	{/if}
	<div class="l:stack:xs">
		{#if series}
			<p class="h5">{`Part ${page} of ${series.length}`}</p>
			<ol>
				{#each series as item, index}
					<li
						aria-current={page && page === index + 1 ? 'page' : undefined}
						class={page && page === index + 1 ? colorClass : ''}
					>
						<a href={item.link} class="card:2xs">{item.title}</a>
					</li>
				{/each}
			</ol>
		{/if}
		{#if children}
			{@render children()}
		{/if}
	</div>
</aside>
