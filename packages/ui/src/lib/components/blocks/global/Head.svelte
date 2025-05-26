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
	<meta
		name="theme-color"
		media="(prefers-color-scheme: light)"
		content="day"
	/>
	<meta
		name="theme-color"
		media="(prefers-color-scheme: dark)"
		content="night"
	/>
</svelte:head>
