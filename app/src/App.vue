<template>
  <ConsoleScreen/>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import ConsoleScreen from "~/pages/ConsoleScreen.vue";

onMounted(() => console.log('root mounted'));

</script>
<style lang="scss">
@import "~/assets/style/main.scss";
@import "~/assets/style/fonts.scss";
@import '~/assets/style/variables';
</style>
