<template>
  <div class="application">
    <div class="screen">
      <component :is="currentPage"></component>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import mainStoreMixin from "@/components/mixins/mainStoreMixin.vue"
import MenuScreen from "@/screen/MenuScreen.vue"
import LoginScreen from "@/screen/LoginScreen.vue"
import OffScreen from "@/screen/OffScreen.vue"
import BlockedScreen from "@/screen/BlockedScreen.vue"

export default defineComponent({
  name: 'terminal',

  mixins: [mainStoreMixin],

  components: {
    MenuScreen,
    LoginScreen,
    BlockedScreen,
    OffScreen
  },

  data: () => ({
    "screens": {
      "menu": MenuScreen,
      "login": LoginScreen,
      "blocked": BlockedScreen,
      "off": OffScreen
    }
  }),

  computed: {
    currentPage() {
      const key = this.mainStore.status || "login"
      console.log(`Loading screen: '${key}'`)
      return this.screens[key]
    }
  },

  mounted() {
    const config = this.mainStore.config
    if (config.standalone) {
      console.log(`Blackshell working. Standalone: ${config.standalone} Debug: ${config.debug}`)
    }
  },
})

</script>
<style lang="scss">
//@import "@/assets/style/main.scss";
//@import "@/assets/style/fonts.scss";
</style>
