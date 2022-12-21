<script lang="ts">
	import { page } from '$app/stores';
	const { decisions } = $page.data;
</script>

{#each decisions as { meta, path }}
	<a class="font:xxl" href={path}>{meta.title}</a>
{/each}
