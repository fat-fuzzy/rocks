<script lang="ts">
	export let size = 'md'
	export let placement = ''
	export let theme = ''
</script>

<div class={`l-sidebar ${placement} ${theme}`}>
	<div class={`l-side ${size}`}>
		<slot name="side"><!-- optional fallback --></slot>
	</div>
	<div class={'l-main'}>
		<slot name="main"><!-- optional fallback --></slot>
	</div>
</div>
