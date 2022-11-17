<svelte:options accessors={true} />

<script>
  // Inputs
  export let size = 'md'
  export let icon = ''
  export let variant = 'primary'
  export let testId = 'btn'
  export let disabled = false
  export let type = 'button'

  // Event Handlers
  export let handleClick = () => {}

  $: className = `${icon} ${size} ${variant}`
</script>

<button data-test={testId} on:click={handleClick} class={className} {disabled} {type}>
  <slot />
</button>

<!-- <style lang="scss">
  @property --btn-padding {
    syntax: '<length>';
    inherits: false;
    initial-value: 0.5rem 1rem;
  }
  @property --primary {
    syntax: '<color>';
    inherits: false;
    initial-value: transparent;
  }
  @property --btn-color {
    syntax: '<color>';
    inherits: false;
    initial-value: black;
  }
  @property --btn-radii {
    syntax: '<length>';
    inherits: false;
    initial-value: 0.5rem;
  }

  /* Kev@Svelte example*/
  .button {
    /* API */
    --_btn-background-hover: var(--btn-background-hover, var(--primary-dark, transparent));
    --_btn-background-disabled: var(--btn-background-disabled, grey);

    /* Styles */
    border: none;
    border-radius: var(--btn-radii);
    padding: var(--btn-padding);
    background: var(--btn-background, var(--primary));
    color: var(--btn-color);
    cursor: pointer;

    &:hover {
      --btn-background: var(--_btn-background-hover);
    }

    &:disabled {
      --btn-background: var(--btn-background-disabled);
      --btn-background-hover: var(--btn-background-disabled);
    }
  }
</style> -->
