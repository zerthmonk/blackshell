<template>
  <div class="account-row" :class="{hacked: account.hacked}">
    <div class="textbar__main">
      <span><a class="prompt"></a>{{account.username}}</span></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "AccountString",
  emits: ['accountSelect'],

  props: {
    account: {}
  }
})
</script>

<style lang="scss" scoped>
.account-row {
  display: flex;
  max-width: 320px;
  border: 1px solid rgba($color-white, .3);
  padding: 1.75rem;
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

.hacked {
  filter: hue(red);
  color: lighten($color-danger, 15%);
  border: 1px dotted rgba($color-danger, .8);

  &:hover {
    background: rgba(lighten($color-danger, 15%), .05);
    border: 1px dotted rgba($color-danger, 1);
    span {
      animation: pulsebg 1s infinite;
    }
  }
}
</style>
