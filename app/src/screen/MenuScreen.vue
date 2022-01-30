<template>
  <div class="screen">
    <background :theme="mainStore.colorTheme"></background>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Background from "@/components/basic/Background.vue"
import Console from "@/components/console/Console.vue"
import mainStoreMixin from "@/components/mixins/mainStoreMixin.vue"

export default defineComponent({
  name: "MenuScreen",
  mixins: [mainStoreMixin],
  components: {
    Background,
    Console
  },

})

</script>