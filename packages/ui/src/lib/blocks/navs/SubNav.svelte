<script lang="ts">
	import {clickOutside} from '../../utils/click-outside.js'
	import LinkList from './LinkList.svelte'

	export let layout = ''
	export let size = ''
	export let breakpoint = ''
	export let variant = ''
	export let path = ''
	export let id = 'sub-nav'
	export let title = 'Sub Nav'
	export let align = 'start'
	export let items = [
		{
			slug: 'ui',
			title: 'UI LIbrary Link - SubNav Example',
			items: [
				{
					slug: 'blocks',
					title: 'Blocks Link 1',
					items: [
						{slug: 'SubNav', title: 'SubNav Item  1 A'},
						{slug: 'SubNav', title: 'SubNav Item  1 B'},
					],
				},
				{
					slug: 'blocks',
					title: 'Blocks Link 2',
				},
				{
					slug: 'blocks',
					title: 'Blocks Link 3',
					items: [
						{slug: 'SubNav', title: 'SubNav Item 2 A'},
						{slug: 'SubNav', title: 'SubNav Item 2 B'},
					],
				},
				{
					slug: 'blocks',
					title: 'Blocks Link 4',
				},
			],
		},
	]

	let expanded = false

	function toggleReveal(event) {
		expanded = !expanded
	}

	function handleClickOutside(event) {
		expanded = false
	}

	$: show = expanded ? 'show' : 'hide'
</script>

<nav
	aria-labelledby={id}
	class={`l-reveal l-${layout} ${size} ${breakpoint} sub-nav`}
	use:clickOutside
	on:clickOutside={handleClickOutside}
>
	<button
		{id}
		type="button"
		class={`toggle collapse  ${size} ${variant}`}
		aria-expanded={expanded}
		aria-controls={`${id}-menu-list`}
		on:click={toggleReveal}
	>
		{title}
	</button>
	<LinkList id={`${id}-menu-list`} {path} {items} {layout} {size} {align} {show} depth={0} />
</nav>
