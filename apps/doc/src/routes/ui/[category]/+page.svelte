<script lang="ts">
	import {content} from '@fat-fuzzy/ui-s5'
	import {page} from '$app/stores'

	const {PageMain} = content

	let category = $derived($page.params.category)
	let path = $derived($page.url.pathname)
	let title = $derived(
		`${category.charAt(0).toUpperCase()}${category.slice(1)}`,
	)
	let description = $derived(`${title} | Doc`)
</script>

<PageMain {title} {description}>
	<ul>
		<li><a href={`${path}/doc`}>Doc</a></li>
		<li><a href={`${path}/demo`}>Demo</a></li>
	</ul>
</PageMain>
