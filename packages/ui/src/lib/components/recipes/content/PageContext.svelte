<script lang="ts">
	import type {AsideProps} from '$types'
	import Feedback from '$lib/components/blocks/global/Feedback.svelte'
	import {resolve} from '$app/paths'

	let {
		status,
		surface = 'primary',
		surfaceLightness = 0,
		created,
		updated,
		series,
		children,
		page,
	}: AsideProps = $props()

	let colorClass = $derived(`surface:${surfaceLightness}:${surface}`)
	let publishedIcon = $derived(updated !== created ? 'outdated' : 'published')
</script>

{#if updated && created}
	<div class="l:burrito:lg maki:block:lg">
		<Feedback
			{status}
			variant="bare"
			size="2xs"
			font="2xs"
			context="prose"
			asset="none"
			layout="stack"
			{surface}
			{surfaceLightness}
		>
			<p class="l:flex size:2xs font:2xs justify:between">
				<span class={`emoji:${publishedIcon}`}>Published</span>
				<span class="maki:inline">{created}</span>
			</p>
			{#if updated !== created}
				<p class="l:flex size:2xs font:2xs justify:between">
					<span class="emoji:updated">Updated</span>
					<span class="maki:inline">{updated}</span>
				</p>
			{/if}
		</Feedback>
	</div>
{/if}
<div class="l:burrito:lg l:stack:xs">
	{#if series}
		<p class="h5 maki:inline size:sm">{`Part ${page} of ${series.length}`}</p>
		<ol class="font:xs l:stack:2xs">
			{#each series as item, index (index)}
				<li
					aria-current={page && page === index + 1 ? 'page' : undefined}
					class={page && page === index + 1 ? colorClass : ''}
				>
					<a href={resolve(item.link)} class="ravioli:xs font:sm">
						{item.title}
					</a>
				</li>
			{/each}
		</ol>
	{/if}
	{#if children}
		{@render children()}
	{/if}
</div>
