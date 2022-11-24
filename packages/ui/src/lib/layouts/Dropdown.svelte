<script lang="ts">
	import {clickOutside} from '../utils/click-outside.js'

	export let layout = `l-stack`
	export let size = `md`
	export let variant = `primary`
	export let alignment = `left`
	export let items: {title: string}[] = [{title: 'Item 1'}, {title: 'Item 2'}]

	let menuExpanded = false

	function toggleDropdown(event) {
		menuExpanded = !menuExpanded
	}

	function handleClickOutside(event) {
		menuExpanded = false
	}

	$: show = menuExpanded ? `show ${alignment}` : `hide`
</script>

<div class="dropdown">
	<menu class={`${layout} ${size}`} use:clickOutside on:click_outside={handleClickOutside}>
		<slot name="toggle">
			<button
				type="button"
				class={`toggle collapse ${variant}`}
				aria-expanded={menuExpanded}
				on:click={toggleDropdown}
			>
				Open
			</button>
		</slot>
		<div class={show}>
			<slot name="content">
				<menu class={`${layout} ${size}`}>
					<slot name="content">
						{#each items as { title }}
							<p>{title}</p>
						{/each}
					</slot>
				</menu>
			</slot>
		</div>
	</menu>
</div>
