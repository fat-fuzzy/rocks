<script lang="ts">
	type Props = {
		text?: string
		href?: string
	}
	let {text = 'Skip to main', href = '#main'}: Props = $props()
</script>

<a class="skip-link sr-only" {href}>{text}</a>
