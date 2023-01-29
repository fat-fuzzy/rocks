<script lang="ts">
	export let size = 'd'
	export let align = ''
	export let theme = ''
</script>

<div class={`l-sidebar ${align} ${theme}`}>
	<div class={`l-side ${size}`}>
		<slot name="side"><!-- optional fallback --></slot>
	</div>
	<div class={'l-main'}>
		<slot name="main"><!-- optional fallback --></slot>
	</div>
</div>
