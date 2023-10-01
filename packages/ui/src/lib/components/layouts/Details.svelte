<script lang="ts">
	export let layout = ''
	export let size = ''
	export let breakpoint = ''
	export let variant = ''
	export let align = 'start'
	export let id = 'reveal'
	let expanded = false

	function toggleReveal(event) {
		expanded = !expanded
	}

	$: show = expanded ? 'show' : 'hide'
</script>

<details class={`l:reveal l:${layout} bp:${breakpoint} ${size}`} open>
	<summary
		class={`${variant}`}
		aria-expanded={expanded}
		aria-controls={`${id}-menu-list`}
		on:click={toggleReveal}
	>
		<slot name="summary">Click to Reveal</slot>
	</summary>
	<div class={`${align} ${show}`}>
		<slot name="content">
			<div class="card layer l:${layout} bp:${breakpoint} ${size}">
				<h3>Revealed Content</h3>
				<p>This is a card with some content</p>
			</div>
		</slot>
	</div>
</details>
