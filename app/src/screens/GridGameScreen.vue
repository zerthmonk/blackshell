<template>
  <Layout class="game">
    <template #header>
      <div class="game__header">
        <p class="game__label">calculating</p>
      </div>
    </template>
    <template #main>
      <div class="game__main">
        <Field class="game__field" />
        <div class="game__backtrace">
          <p class="game__label">attack vectors</p>
          <Traces class="game__traces" />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="game__footer">
        <div class="game__buffer">
          <p class="game__label">tracing...</p>
          <Solution class="solution" />
        </div>
      </div>
    </template>
    <template #background>
      <Background theme="normal" />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { useStore } from "@/stores/gridgame";
import Layout from "@/components/layout/BaseLayout.vue";
import Background from "@/components/base/BackGround.vue";
import Field from "@/components/hack/gridgame/GridField.vue";
import Traces from "@/components/hack/gridgame/GridTraces.vue";
import Solution from "@/components/hack/gridgame/GridSolution.vue";

const store = useStore();
const size = 5;
store.init({ size: size, tries: 6 });
</script>

<style scoped lang="scss">
$maxwidth: 380px;

.game {
  &__header {
    height: 2rem;
  }

  &__label {
    font-size: 0.875rem;
    line-height: 2rem;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  &__main {
    display: flex;
    overflow: hidden;
    height: 100%;
    gap: 2rem;
  }

  &__field {
    position: relative;
    display: grid;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: rgba(50, 50, 50, 0.4);
    max-width: $maxwidth;
    padding: 0.2rem;
    gap: 0.15rem;
    font-size: 1.25rem;
    z-index: 1;
  }

  &__backtrace {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  &__traces {
    display: flex;
    flex-direction: column;
  }
  &__label {
    font-size: 0.75em;
    letter-spacing: 1px;
  }

  &__buffer {
    max-width: $maxwidth;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media only screen and (max-width: $tablet) {
  .game {
    &__main {
      gap: 1rem 0;
      flex-wrap: wrap;
      overflow-y: auto;
      height: fit-content;
    }

    &__backtrace {
      width: 100%;
      max-width: $maxwidth;
      padding-bottom: 1rem;
    }

    &__traces {
      flex-wrap: wrap;
      justify-content: space-between;
    }

    &__label {
      width: 100%;
    }
  }
}
</style>
