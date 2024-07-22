<script lang="ts">
	export let size = ''
	export let align = ''
	export let theme = ''
	export let threshold: string | undefined = undefined

	$: mainClass = threshold ? `l:main th:${threshold}` : 'l:main'
</script>

<div class={`l:sidebar:${size} ${align} ${theme}`}>
	<div class={`l:side`}>
		<slot name="side"><!-- optional fallback --></slot>
	</div>
	<div class={mainClass}>
		<slot name="main"><!-- optional fallback --></slot>
	</div>
</div>
