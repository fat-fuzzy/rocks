<script lang="ts">
	import {page} from '$app/stores'

	import {headless} from '@fat-fuzzy/ui-s5'

	const {Head} = headless

	let category = $derived($page.params.category)
	let path = $derived($page.url.pathname)
	let title = $derived(
		`${category.charAt(0).toUpperCase()}${category.slice(1)}`,
	)
	let headerClass = `card:sm bp:xs bg:polar`
</script>

<Head {title} page="UI" description={`${title} Doc`} />

<header class={headerClass}>
	<h1 class="main">{title}</h1>
</header>
<ul>
	<li><a href={`${path}/doc`}>Doc</a></li>
	<li><a href={`${path}/demo`}>Demo</a></li>
</ul>
