<script lang="ts">
	export let size = 'md'
</script>

<div class="l-sidebar">
	<div class="l-sidebar-main">
		<slot name="main"><!-- optional fallback --></slot>
	</div>
	<div class={`l-sidebar-side ${size}`}>
		<slot name="side"><!-- optional fallback --></slot>
	</div>
</div>
