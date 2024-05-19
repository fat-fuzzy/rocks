<!-- <svelte:options tag="style-capsule" />

<script>
	import {onMount} from 'svelte'
	import {browser} from '$app/environment'

	export let theme
	let styles
	let styleElement

	onMount(async () => {
		if (theme) {
			styles = await import(`../styles/theme/${theme}/_index.scss`)
			if (browser) {
				styleElement = document.createElement('style')
				styleElement.textContent = styles.default
			}
		}
	})
</script>

{#if styles && styleElement}
	<div id="style-this-content">
		<button class="primary">Test Inside Style Capsule: {theme}</button>
		<slot />
	</div>
{/if}

{#if styleElement}
	{@html styleElement}
{/if} -->
