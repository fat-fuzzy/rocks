<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	let { decisions } = data;
</script>

{#each decisions as { meta, path }}
	<a href={path}>{meta.title}</a>
	Published {meta.year}
{/each}
