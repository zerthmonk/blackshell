<template>
<!--  <div class="screen">-->
<!--    <component :is="currentMenuComponent"></component>-->
<!--  </div>-->

  <div class="screen__background_fill">
    <background
      :hue="140"
      :brightness="80"
      :opacity="80"
    ></background>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useShellStore} from "@/store";
import Background from "@/components/basic/Background.vue"
import Console from "@/components/console/Console.vue"

export default defineComponent({
  name: "MenuScreen",
  components: {
    Background,
    Console
  },

  computed: {
    ...mapStores(useShellStore),
    currentMenuComponent() {
      return Console
    }
  },

  mounted() {
    const config = this.shellStore.config;
    if (config.standalone) {
      console.log(`Blackshell working. Standalone: ${config.standalone} Debug: ${config.debug}`)
    }
  },

})

</script>