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
	let fullPrefix = $derived(page ? `${prefix} ${page}` : `${prefix}`)
	let fullTitle = $derived(title ? `${fullPrefix} | ${title}` : `${fullPrefix}`)
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
</svelte:head>
