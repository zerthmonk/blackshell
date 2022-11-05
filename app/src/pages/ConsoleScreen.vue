<template>
  <Layout>
    <!-- <template #header>
      <p>header</p>
    </template> -->
    <template #main>
      <Console/>
    </template>
    <!-- <template #footer>
      <p>footer</p>
    </template> -->
    <template #background>
      <Background/>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '@/components/layout/Base.vue';
import Background from "@/components/base/Background.vue";
import Console from '@/components/console/Console.vue';

</script>

<style lang="scss">
</style>