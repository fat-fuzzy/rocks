<svelte:options tag="style-capsule-ui" />

<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let styles
	let styleElement

	onMount(
	async()=>{
		styles = await import('../styles/app/ui/_main.scss?inline')
		if (browser) {
			styleElement = document.createElement('style')
			styleElement.textContent = styles.default
		}
	})
</script>

{#if styles && styleElement}
	<div id="style-this-content">
		<button class="primary">Test Inside Style Capsule UI</button>	
		<slot/>
	</div>
{/if}

{#if styleElement}
{@html styleElement}
{/if}