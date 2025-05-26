<script lang="ts">
	type Props = {
		text?: string
		href?: string
	}
	let {text = 'Skip to main', href = '#main'}: Props = $props()
</script>

<ul id="a11y-links" class="sr-only">
	<li><a class="skip-link" {href}>{text}</a></li>
</ul>
