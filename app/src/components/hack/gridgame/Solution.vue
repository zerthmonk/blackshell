<template>
  <div class="root">
    <Trace :content="getSolution" :interactive="false"/>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStore } from '@/stores/gridgame';
import Trace from "./Trace.vue";

const store = useStore();
const { getSolution } = storeToRefs(store);
</script>
<style scoped lang="scss">
.root {
  display: flex;
  flex-direction: column;
  gap: 1em;
}
</style>