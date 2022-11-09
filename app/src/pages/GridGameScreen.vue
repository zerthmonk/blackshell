<template>
  <Layout>
    <template #header>
      <p class="page-label">this is grid game</p>
    </template>
    <template #main>
      <div class="game">
        <Field class="field"/>
        <Solving class="info"/>
      </div>
    </template>
    <template #background>
      <Background theme="normal"/>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { useStore } from "@/stores/gridgame";
import Layout from "@/components/layout/Base.vue";
import Background from "@/components/base/Background.vue";
import Field from "@/components/hack/gridgame/Field.vue";
import Solving from "@/components/hack/gridgame/Solving.vue";

const store = useStore();
store.init({size: 7, tries: 6});

</script>

<style scoped lang="scss">

.page-label {
  font-size: .875rem;
  line-height: 2rem;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.game {
  display: flex;
  gap: 2rem;

  .field {
    position: relative;
    display: grid;
    height: fit-content;
    width: fit-content;
    border: 1px solid rgba(255,255,255,.15);
    background: rgba(50,50,50,0.4);
    padding: .2rem;
    gap: .15rem;
    z-index: 1;
  }
}

</style>