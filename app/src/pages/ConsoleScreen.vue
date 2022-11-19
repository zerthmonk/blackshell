<template>
  <Layout>
    <template #main>
      <Console />
    </template>
    <template #background>
      <Background />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/layout/BaseLayout.vue";
import Background from "@/components/base/BackGround.vue";
import Console from "@/components/console/ConsoleFull.vue";
</script>
