<script lang="ts">
	import type {HeadProps} from '$types'
	let {
		title,
		description = 'Page description',
		pageName,
		prefix = 'Fat Fuzzy',
	}: HeadProps = $props()
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
