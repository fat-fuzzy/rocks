<script lang="ts">
	type Props = {
		title: string
		description: string
		pageName?: string
		prefix?: string
	}
	let {
		title,
		description = 'Page description',
		pageName,
		prefix = 'Fat Fuzzy',
	}: Props = $props()
	let fullPrefix = $derived(
		!pageName?.startsWith(prefix) ? `${prefix} ${pageName}` : `${pageName}`,
	)
	let fullTitle = $derived(
		title && title !== pageName ? `${fullPrefix} | ${title}` : `${fullPrefix}`,
	)
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
</svelte:head>
