<script lang="ts">
	export let page = ''
	export let prefix = 'Fat Fuzzy'
	export let title = 'Page title'
	export let description = 'Page description'

	$: fullTitle = page ? `${prefix} ${page} | ${title}` : `${prefix} | ${title}`
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
</svelte:head>
