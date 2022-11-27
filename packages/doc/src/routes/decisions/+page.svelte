<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	let { decisions } = data;

	const PAGE = './decisions';
	function getLink({ id }) {
		// const link = `${PAGE}/${year}/${id}`;
		const link = `${PAGE}/${id}`;
		return link;
	}
</script>

{#each decisions as { id, title }}
	<a href={getLink({ id })}>{id} {title}</a>
{/each}
