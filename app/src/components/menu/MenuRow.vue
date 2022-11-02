<template>
  <div class="menu-row">
    <div v-if="rowData" class="textbar__main">
      <span>{{rowData.title}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "menuRow",

  props: {
    rowData: {}
  }

})
</script>

<style lang="scss" scoped>
.menu-row {
  display: flex;
  max-width: 320px;
  border: 1px solid rgba($color-white, .3);
  padding: 1rem 1.75rem;
  margin: .25rem;
  margin-bottom: .75rem;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    border: 1px solid white;
    background: rgba($color-main, .05);
    span {
      animation: pulsebg 1s infinite;
    }
  }
}
</style>
