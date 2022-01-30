<template>
  <div class="account-row">
    <div class="textbar__main">
      <span><a class="prompt"></a>{{username}}</span></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "AccountString",
  emits: ['accountSelect'],

  props: {
    username: {
      type: String,
    }
  }
})
</script>

<style lang="scss" scoped>
.account-row {
  display: flex;
  max-width: 320px;
  border: 1px solid $main-opaque;
  padding: 1.75rem;
  margin: .25rem;
  margin-bottom: .75rem;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;

  &:hover {
    border: 1px solid white;
    background: rgba(255, 255,255, 0.15);
    span {
      animation: pulsebg 1s infinite;
    }
  }

}
</style>
