<template>
  <div class="application">
    <div class="screen">
      <MenuScreen/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import config from "@/assets/config.json"
import MenuScreen from "@/screen/MenuScreen.vue"

export default defineComponent({
  components: {
    MenuScreen
  },
  name: 'terminal',

  mounted() {
    if (config.standalone) {
      console.log(`Blackshell working standalone, config loaded. DEBUG: ${config.debug}`)
      if (config.debug) console.log(config)
    }
  }
})

</script>
<style lang="scss">
@import "@/assets/style/main.scss";
</style>
