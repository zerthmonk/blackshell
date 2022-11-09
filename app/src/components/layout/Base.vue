<template>
  <div class="layout">
    <slot name="header"></slot>
    <slot name="main"></slot>
    <slot name="footer"></slot>
  </div>
  <slot name="background"></slot>
</template>

<style scoped lang="scss">
.layout {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  z-index: 1;
  gap: .5rem;
  padding: 1.5rem;
}

@media only screen and (max-width: $tablet) {
  .layout {
    padding: 1.25rem .75rem;
  }
}
</style>