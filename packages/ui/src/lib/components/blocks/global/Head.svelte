<script lang="ts">
	export let title = 'Page title'
	export let description = 'Page description'
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>
