<template>
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <router-view/>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: "base"
}
</script>

<style lang="scss">
@import '~/assets/style/main.scss';
</style>