<script>
	import {resolve} from '$app/paths'
</script>

<main>
	<h1 class="ravioli:2xl font:heading surface:1:neutral">Fat Fuzzy Tests</h1>
	<ul>
		<li><a href={resolve('/tests/forms')}>forms</a></li>
		<li><a href={resolve('/tests/recipes/tabs')}>recipes/tabs</a></li>
		<li>
			<a href={resolve('/tests/recipes/content/page-tabs')}>
				recipes/content/page-tabs
			</a>
		</li>
	</ul>
</main>
