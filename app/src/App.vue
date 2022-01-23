<template>
  <div class="application">
    <div class="screen">
      <PageMain></PageMain>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import json from "@/assets/config.json"
import PageMain from "@/pages/PageMain.vue"

export default defineComponent({
  components: {
    PageMain
  },
  name: 'terminal',

  mounted() {
      console.log(json)
  }
})

</script>
<style lang="scss">
@import "@/assets/style/main.scss";
</style>
