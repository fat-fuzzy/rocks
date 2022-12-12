<script lang="ts">
	import LinkList from './LinkList.svelte'
	export let id = ''
	export let layout = `stack`
	export let size = `md`
	export let path = ''
	export let align = 'start'
	export let items: {slug: string; title: string; emoji?: string}[] = [
		{slug: '', title: 'Home'},
		{slug: 'about', title: 'About'},
	]
</script>

<nav {id}>
	<LinkList {items} {path} {layout} {size} {align} />
</nav>
