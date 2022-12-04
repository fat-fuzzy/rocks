<script lang="ts">
	import {clickOutside} from '../utils/click-outside.js'

	export let layout = 'stack'
	export let size = 'md'
	export let variant = 'primary'
	export let alignment = 'left'
	let expanded = false

	function toggleDropdown(event) {
		expanded = !expanded
	}

	function handleClickOutside(event) {
		expanded = false
	}

	$: show = expanded ? `show ${alignment}` : 'hide'
</script>

<div class="l-reveal">
	<menu class={`l-${layout} ${size}`} use:clickOutside on:clickOutside={handleClickOutside}>
		<slot name="toggle">
			<button
				type="button"
				class={`toggle collapse ${variant}`}
				aria-expanded={expanded}
				on:click={toggleDropdown}
			>
				Open
			</button>
		</slot>
		<div class={show}>
			<slot name="content" />
		</div>
	</menu>
</div>
