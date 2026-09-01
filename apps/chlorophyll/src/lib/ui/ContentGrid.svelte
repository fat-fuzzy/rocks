<script lang="ts">
	import type {Snippet} from 'svelte'
	import type {UiColor} from '@fat-fuzzy/ui'
	import type {VitalPage} from '$types'

	import {resolve} from '$app/paths'

	let {
		color = 'primary',
		page,
		actions,
		links,
		headings,
		description,
	}: {
		color?: UiColor
		page: VitalPage
		actions: string[]
		links: {[cta: string]: string}
		headings: {[cta: string]: string}
		description: Snippet<[action: string]>
	} = $props()

	let sizeClass = $derived(actions.length > 2 ? '3xl' : '2xl')
</script>

<div class={`l:text:${sizeClass} l:flex justify:center`}>
	<ul class="l:grid:auto size:md">
		{#each actions as action, i (i)}
			{@const actionLink = links[action]}
			<li
				class="l:stack justify:between color:neutral surface:1:neutral shape:soft ravioli:lg"
			>
				<div class="maki:inline:lg">
					<h3>
						{headings[action]}
					</h3>
					<div class="l:flex:3xs w:full maki:block">
						{@render description(action)}
					</div>
				</div>
				{#if actionLink}
					<div
						class="l:stack w:full surface:2:{color} shape:mellow maki:inline:md maki:block:md"
					>
						<a
							href={resolve(`/${page}/${action}`)}
							class="l:flex font:semibold font:heading justify:center ravioli:2xs shape:mellow"
						>
							{actionLink}
						</a>
					</div>
				{/if}
			</li>
		{/each}
	</ul>
</div>
