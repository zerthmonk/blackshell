<template>
  <Layout>
    <template #header>
      <h1>this is grid game</h1>
    </template>
    <template #main>
      <Field class="gridgame__field"></Field>
    </template>
    <template #background>
      <Background theme="normal"/>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "~/components/layout/Base.vue";
import Background from "~/components/base/Background.vue";
import Field from "~/components/hack/gridgame/Field.vue";
</script>

<style scoped lang="scss">

.gridgame__field {
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

.backtrace {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
}

// .dotted {
//   padding: 1rem;
//   border: 1px dotted rgba(var(--color-main-val), .15);
// }

// .denied {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 100%;
//   padding: 1rem;
//   overflow-wrap: break-word;
// }

// .footer, .header {
//   display: flex;
//   gap: 2rem;
//   z-index: 5;
//   padding-left: 1rem;
// }

.blurred {
  transition: all 300ms ease-in-out;
  filter: blur(3px) contrast(5%);
}

@media only screen and (max-width: 600px) {
  .dotted {
    padding: .5rem;
  }

  .gridgame__field, .gridgame__backtrace {
    width: 100%;
    font-size: .75rem;
    justify-self: center;
  }
}
</style>