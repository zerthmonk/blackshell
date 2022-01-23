<template>
  <div class="application">
    <div class="screen">
      <PageMain></PageMain>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageMain from "@/pages/PageMain.vue"

export default defineComponent({
  components: {
    PageMain
  },
  name: 'terminal',
})

</script>
<style lang="scss">
@import "@/assets/style/main.scss";
</style>
