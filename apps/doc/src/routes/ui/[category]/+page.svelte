<script lang="ts">
	import {page} from '$app/stores'

	import {headless, constants} from '@fat-fuzzy/ui-s5'

	const {Head} = headless

	let category = $page.params.category
	let title = `${category.charAt(0).toUpperCase()}${category.slice(1)}`
	let path = $page.url.pathname
	let headerClass = `bp:xs bg:polar`
</script>

<Head {title} page="UI" description={`${title} Doc`} />

<header class={headerClass}>
	<h1 class="main">{title}</h1>
</header>
<ul>
	<li><a href={`${path}/doc`}>Doc</a></li>
	<li><a href={`${path}/demo`}>Demo</a></li>
</ul>
