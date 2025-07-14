<script lang="ts">
	type Props = {
		id: string
		text?: string
		href?: string
	}
	let {id = 'main', text = 'Skip to main', href = '#main'}: Props = $props()
</script>

<ul id={`skip-links-${id}`} class="sr-only">
	<li><a class="skip-link" {href}>{text}</a></li>
</ul>
