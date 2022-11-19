<template>
  <Layout>
    <template #header>
      <div class="game-header">
        <p class="page-label">calculating </p>
      </div>
    </template>
    <template #main>
      <div class="main">
        <Field class="field"/>
        <div class="backtrace">
          <p class="label">attack vectors</p>
          <Traces class="traces"/>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="footer">
        <div class="buffer">
          <p class="label">tracing...</p>
          <Solution class="solution"/>
        </div>
      </div>
    </template>
    <template #background>
      <Background theme="normal"/>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { useStore } from "@/stores/gridgame";
import Layout from "@/components/layout/BaseLayout.vue";
import Background from "@/components/base/BackGround.vue";
import Field from "@/components/hack/gridgame/Field.vue";
import Traces from "@/components/hack/gridgame/Traces.vue";
import Solution from "@/components/hack/gridgame/Solution.vue";

const store = useStore();
const size = 5;
store.init({size: size, tries: 6});

</script>

<style scoped lang="scss">

$maxwidth: 380px;
.game-header {
  height: 2rem;
}
.page-label {
  font-size: .875rem;
  line-height: 2rem;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.main {
  display: flex;
  overflow: hidden;
  height: 100%;
  gap: 2rem;
}
.field {
  position: relative;
  display: grid;
  border: 1px solid rgba(255,255,255,.15);
  background: rgba(50,50,50,0.4);
  max-width: $maxwidth;
  padding: .2rem;
  gap: .15rem;
  font-size: 1.25rem;
  z-index: 1;
}
.backtrace {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.traces {
  display: flex;
  flex-direction: column;
}
.label {
  font-size: .75em;
  letter-spacing: 1px;
}

.buffer {
  max-width: $maxwidth;
  display: flex;
  flex-direction: column;
  gap: .5rem;
}

@media only screen and (max-width: $tablet) {
  .main {
    gap: 1rem 0;
    flex-wrap: wrap;
    overflow-y: auto;
    height: fit-content;
  }

  .backtrace {
    width: 100%;
    max-width: $maxwidth;
    padding-bottom: 1rem;

    .traces {
      flex-wrap: wrap;
      justify-content: space-between;
    }

    .label {
      width: 100%;
    }
  }
}

</style>