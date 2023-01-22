<script lang="ts">
	import {clickOutside} from '../../utils/click-outside.js'
	import format from '../../utils/format'
	import LinkList from './LinkList.svelte'

	export let layout = ''
	export let size = ''
	export let breakpoint = ''
	export let variant = ''
	export let color = ''
	export let path = ''
	export let id = 'reveal-nav'
	export let title = 'RevealNav'
	export let icon = ''
	export let align = 'start'
	export let items = [
		{
			slug: 'ui',
			title: 'UI LIbrary Link - RevealNav Example',
			items: [
				{
					slug: 'blocks',
					title: 'Blocks Link 1',
					items: [
						{slug: 'RevealNav', title: 'RevealNav Item  1 A'},
						{slug: 'RevealNav', title: 'RevealNav Item  1 B'},
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
						{slug: 'RevealNav', title: 'RevealNav Item 2 A'},
						{slug: 'RevealNav', title: 'RevealNav Item 2 B'},
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

	$: show = expanded ? 'show card:lg layer contrast' : 'hide'
</script>

<nav aria-labelledby={id} class={`l-reveal l-${layout} ${size} ${breakpoint} sub-nav`}>
	<button
		{id}
		type="button"
		class={`toggle collapse  ${size} ${variant} ${color}`}
		aria-expanded={expanded}
		aria-controls={`${id}-menu-list`}
		on:click={toggleReveal}
		use:clickOutside
		on:clickOutside={(event) => handleClickOutside(event)}
	>
		{format.formatLabel(title, icon)}
	</button>
	<div id={`${id}-menu-list`} class={show}>
		<LinkList {path} {items} {size} {align} depth={0} />
	</div>
</nav>
