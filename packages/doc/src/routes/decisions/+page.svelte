<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	let { decisions } = data;
</script>

{#each decisions as { meta, path }}
	<a class="font-size:xxl" href={path}>{meta.title}</a>
{/each}
