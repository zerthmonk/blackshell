<template>
  <div :class="$style.root">
    <slot name="header"></slot>
    <slot name="main"></slot>
    <slot name="footer"></slot>
    <slot name="background" :class="$style.background"></slot>
  </div>
</template>

<style module lang="scss">
.root {
  position: relative;
  display: grid;
  align-content: end;
  height: 100vh;
  width: 100vw;
  z-index: 1;
  padding: 1.5rem;
  box-sizing: border-box;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

@media only screen and (max-width: 768px) {
  .root {
    padding: 1.25rem .5rem;
  }
}
</style>