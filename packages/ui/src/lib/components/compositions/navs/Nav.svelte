<script lang="ts">
	import LinkList from '$lib/components/compositions/navs/LinkList.svelte'
	export let id = ''
	export let layout = ''
	export let size = ''
	export let path = ''
	export let align = 'start'
	export let items: any[] = []
</script>

<nav {id} aria-label={id}>
	<LinkList id={`${id}-${path}`} {items} {path} depth={0} {layout} {size} {align} />
</nav>
