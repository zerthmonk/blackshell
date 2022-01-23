<template>
  <div class="screen">
    <component :is="currentMenuComponent"></component>
  </div>

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
import Background from "@/components/basic/Background.vue"
import Console from "@/components/console/Console.vue"

export default defineComponent({
  name: "MenuScreen",
  components: {
    Background,
    Console
  },

  computed: {
    currentMenuComponent() {
      return Console
    }
  }
})

</script>