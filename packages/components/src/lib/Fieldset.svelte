<script>
	export let slug = ''
	export let label = ''
	export let size = 'sm'
</script>

<fieldset data-cy={slug} class={size}>
	<legend>{label}</legend>
	<slot />
</fieldset>

<style lang="scss">
	@import '../styles/common/fieldset.scss';
	.xs {
		padding: 0 getVar(padding-sm);
	}
	.sm {
		padding: 0 getVar(padding-md);
	}
	.md {
		padding: getVar(padding-md) getVar(padding-lg);
	}
	.lg {
		padding: getVar(padding-lg) getVar(padding-xl);
	}
	.xl {
		padding: getVar(padding-xl) calc(getVar(padding-xl) * 2);
	}
</style>
