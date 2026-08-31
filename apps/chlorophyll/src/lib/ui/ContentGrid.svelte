<script lang="ts">
	import type {Snippet} from 'svelte'

	import {resolve} from '$app/paths'

	let {
		page,
		actions,
		links,
		headings,
		description,
	}: {
		page: 'chlorophyll' | 'xylem'
		actions: string[]
		links: {[cta: string]: string}
		headings: {[cta: string]: string}
		description: Snippet<[action: string]>
	} = $props()
</script>

<ul class="l:grid:auto size:md maki:inline:2xl">
	{#each actions as action, i (i)}
		{@const actionLink = links[action]}
		<li
			class="l:stack align:start justify:between color:neutral surface:1:neutral shape:mellow ravioli:md"
		>
			<h3 class="w:full font:sm">
				{headings[action]}
			</h3>
			<div class="l:flex:3xs w:full font:sm maki:block">
				{@render description(action)}
			</div>
			{#if actionLink}
				<div class="l:stack w:full">
					<a
						href={resolve(`/${page}/${action}`)}
						class="l:flex w:full font:heading font:sm justify:center raviolink color:primary surface:2:primary shape:mellow"
					>
						{actionLink}
					</a>
				</div>
			{/if}
		</li>
	{/each}
</ul>
