<script lang="ts">
	import type {MarkdownMeta} from '$types'

	const {meta, series}: {meta: MarkdownMeta; series: string[]} = $props()
</script>

{#if meta.index !== undefined}
	<nav
		id="slides-nav"
		class="slides-nav l:flex size:xs align:center justify:end"
	>
		{#if meta.index === 0}
			<a
				href={`/about/speaking/${meta.talk}/slide-1`}
				class="emoji:start justify:start shape:mellow"
			>
				Showtime!
			</a>
		{:else}
			{#if meta.index === 1}
				<a
					href={`/about/speaking/${meta.talk}`}
					class="emoji:default justify:start shape:mellow"
				>
					Intro
				</a>
			{/if}
			{#if meta.index > 1}
				<a
					href={`/about/speaking/${meta.talk}/slide-${meta.index - 1}`}
					class="emoji:point-left justify:start shape:mellow"
				>
					{meta.index - 1}
				</a>
			{/if}
			<p class="surface:4:primary shape:round index variant:fill ravioli:2xs">
				{meta.index}
			</p>
			{#if meta.index < series?.length}
				<a
					href={`/about/speaking/${meta.talk}/slide-${meta.index + 1}`}
					class="emoji:point-right justify:end shape:mellow"
				>
					{meta.index + 1}
				</a>
			{/if}
			{#if meta.index === series?.length}
				<p class="emoji:end justify:start">Fin!</p>
			{/if}
		{/if}
	</nav>
{/if}
