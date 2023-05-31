<script lang="ts">
	import LinkList from './LinkList.svelte'
	export let id = ''
	export let layout = ''
	export let size = ''
	export let path = ''
	export let align = 'start'
	export let items: {slug: string; title: string; asset?: string}[] = [
		{slug: '', title: 'Home', asset: '🥚'},
		{slug: 'about', title: 'About', asset: '🐥'},
	]
</script>

<nav {id} aria-label={id}>
	<LinkList id={`${id}-${path}`} {items} {path} depth={0} {layout} {size} {align} />
</nav>
