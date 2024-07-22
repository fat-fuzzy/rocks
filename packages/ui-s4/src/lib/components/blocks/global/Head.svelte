<script lang="ts">
	export let page = ''
	export let prefix = 'Fat Fuzzy'
	export let title = ''
	export let description = 'Page description'

	$: fullPrefix = page ? `${prefix} ${page}` : `${prefix}`
	$: fullTitle = title ? `${fullPrefix} | ${title}` : `${fullPrefix}`
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
</svelte:head>
