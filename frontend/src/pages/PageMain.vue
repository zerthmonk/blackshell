<template>
  <div class="screen__background_fill">
    <background
      :hue="140"
      :brightness="80"
      :opacity="80"
    ></background>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Background from "@/components/basic/Background.vue"

export default defineComponent({
  name: "PageMain",
  components: {Background}
})

</script>