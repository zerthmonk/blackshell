<template>
  <div class="console-stdout">
    <span class="timestamp">{{ message.time }}</span>
    <span class="prompt">{{ prompt }}</span>
    <span :class="{ response: this.message.response }">{{ content }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ConsoleMessage } from '@/models'

export default defineComponent({
  name: "Stdout",
  props: {
    message: {
      type: Object,
      default: {
        content: '',
        response: false,
      }
    },
  },

  computed: {
    prompt() {
      return this.message.response ? "<<" : ">>";
    },
    content() {
      return this.message.content || '';
    }
  }
})
</script>
<style lang="scss">
@import '@/assets/style/variables';

.console-stdout {
  display: flex;
  font-size: 1.75rem;
  font-weight: bolder;
  letter-spacing: 1px;
}

.timestamp {
  margin-right: .25rem
}

.prompt {
  font-weight: bold;
  margin-right: .75rem;
}
.response {
  color: darken(rgba($color-main, .8), 10%)
}

</style>