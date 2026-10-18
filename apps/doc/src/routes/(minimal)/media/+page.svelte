<script lang="ts">
	import {page} from '$app/state'
	import {PageMain} from '@fat-fuzzy/ui'

	let markdown = $derived(page.data.content)
	let title = $derived('')
	let description = $derived(markdown.meta.description)
</script>

<PageMain {title} {description} size="md" justify="center">
	<div class="l:frame">TODO</div>
</PageMain>
