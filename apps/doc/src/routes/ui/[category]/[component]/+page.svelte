<script lang="ts">
	import {content} from '@fat-fuzzy/ui-s5'
	import {page} from '$app/stores'

	const {PageMain} = content

	let title = $derived($page.params.component)
	let path = $derived($page.url.pathname)
	let description = $derived(`${title} | Doc`)
</script>

<PageMain {title} {description}>
	<ul>
		<li><a href={`${path}/doc`}>Doc</a></li>
		<li><a href={`${path}/demo`}>Demo</a></li>
	</ul>
</PageMain>
