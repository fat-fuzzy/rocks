<script lang="ts">
	type Props = {
		text?: string
		href?: string
	}
	let {text = 'Skip to main', href = '#main'}: Props = $props()
</script>

<nav id="a11y-links" class="sr-only">
	<ul>
		<li><a class="skip-link" {href}>{text}</a></li>
	</ul>
</nav>
