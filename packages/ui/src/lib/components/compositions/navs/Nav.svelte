<script lang="ts">
	import LinkList from '$lib/components/compositions/navs/LinkList.svelte'
	export let id = ''
	export let layout = ''
	export let size = ''
	export let path = ''
	export let color = ''
	export let background = ''
	export let container = 'card'
	export let align = 'start'
	export let items: any[] = []

	$: navClasses = `${color} ${container}:${size} bg:${background}`
</script>

<nav {id} aria-label={id} class={navClasses}>
	<LinkList id={`${id}-${path}`} {items} {path} depth={0} {layout} {size} {align} />
</nav>
