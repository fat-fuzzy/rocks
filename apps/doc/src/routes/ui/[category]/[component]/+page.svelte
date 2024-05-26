<script lang="ts">
	import {page} from '$app/stores'

	import {headless} from '@fat-fuzzy/ui-s5'

	const {Head} = headless

	let title = $derived($page.params.component)
	let path = $derived($page.url.pathname)
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
