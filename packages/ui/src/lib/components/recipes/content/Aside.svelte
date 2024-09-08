<script lang="ts">
	let {created, updated} = $props()
</script>

<aside class="l:side hug l:switcher justify:end">
	<div
		class="feedback:prose status:default bg:primary:100 variant:bare card:xs l:text:xs font:sm"
	>
		<p>Published: {created}</p>
		{#if updated !== created}
			<p>Updated: {updated}</p>
		{/if}
	</div>
</aside>
