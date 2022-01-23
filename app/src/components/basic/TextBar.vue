<template>
  <div class="textbar">
    <div class="textbar__main"><span :class="textClass">{{message}}</span></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    message: String,
    textClass: {
      type: String,
      default: "hdr-text"
    }
  }
})
</script>
