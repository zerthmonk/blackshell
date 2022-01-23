<template>
  <div class="application">
    <div class="screen">
      <MenuScreen/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MenuScreen from "@/screen/MenuScreen.vue"

export default defineComponent({

  components: {
    MenuScreen
  },
  name: 'terminal',

})

</script>
<style lang="scss">
@import "@/assets/style/main.scss";
</style>
