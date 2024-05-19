<script lang="ts">
	export let title = 'Page Header'
	export let layout = 'center'
	export let align = 'center'
	export let size = ''
	export let variant = 'card:feature'
	export let background = 'polar'
	export let justify = 'between'

	$: className = `l:text:${size} l:${layout} ${variant}:${size} bg:${background} justify:${justify}`
</script>

<header class={className}>
	<!-- <div class="l:frame l:text:xl">
		<img src={pageImage.src} alt={pageImage.alt} />
	</div> -->
	<h1 class="text:{align}">{title}</h1>
</header>
