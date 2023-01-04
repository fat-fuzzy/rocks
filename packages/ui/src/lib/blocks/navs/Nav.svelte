<script lang="ts">
	import LinkList from './LinkList.svelte'
	export let id = 'nav-block'
	export let layout = ''
	export let size = ''
	export let path = ''
	export let align = 'start'
	export let items: {slug: string; title: string; emoji?: string}[] = [
		{slug: '', title: 'Home'},
		{slug: 'about', title: 'About'},
	]
</script>

<nav {id} aria-label={id}>
	<LinkList {items} {path} depth={0} {layout} {size} {align} />
</nav>
