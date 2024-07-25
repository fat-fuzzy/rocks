<script lang="ts">
	type Props = {
		title: string
		description: string
		page?: string
		prefix?: string
	}
	let {
		title,
		description = 'Page description',
		page,
		prefix = 'Fat Fuzzy',
	}: Props = $props()
	let fullPrefix = $derived(
		!page?.includes(prefix) ? `${prefix} ${page}` : `${page}`,
	)
	let fullTitle = $derived(
		title && title !== page ? `${fullPrefix} | ${title}` : `${fullPrefix}`,
	)
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
</svelte:head>
