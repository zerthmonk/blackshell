<template>
  <GridGameScreen/>
</template>

<script setup lang="ts">
import GridGameScreen from './pages/GridGameScreen.vue';
</script>

<style lang="scss">
@import '~/public/assets/styles/reset.scss';
@import '~/public/assets/styles/fonts.scss';
@import '~/public/assets/styles/variables.scss';

.test {
  width: 100vw;
  height: 100vh;
  background: $color-danger;
}
</style>
