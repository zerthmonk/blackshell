<template>
  <div class="container">
    <header></header>
    <router-view/>
    <footer></footer>
  </div>
</template>

<script>
export default {
  name: "base"
}
</script>

<style lang="scss">
@import '../../assets/style/style.scss';
</style>