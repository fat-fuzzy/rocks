<script lang="ts">
	import type {AsideProps} from '$types'

	let {created, updated, series, children, page}: AsideProps = $props()

	let colorClass = 'surface:1:primary'
</script>

<aside class="l:side hug l:stack:md justify:end">
	{#if updated && created}
		<div
			class="feedback:prose status:default bg:primary:100 variant:bare card:xs font:sm"
		>
			<p>Published: {created}</p>
			{#if updated !== created}
				<p>Updated: {updated}</p>
			{/if}
		</div>
	{/if}
	<div class="l:stack:xs">
		{#if series}
				<p class="h5">{`Part ${page} of a ${series.length}-part series:`}</p>
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
