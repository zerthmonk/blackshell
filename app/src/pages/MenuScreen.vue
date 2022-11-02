<template>
  <div class="screen">
    <div class="menu-hdr">
      <p class="blackshell-hdr">logged as: {{mainStore.activeUser}}</p>
      <a class="logout" @click="logout()"><span>logout</span></a>
    </div>
    <div class="menu">
      <menuRow v-for="item in mainStore.menu" :rowData="item"/>
    </div>
    <background :theme="mainStore.colorTheme"></background>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Background from "~/components/basic/Background.vue"
import mainStoreMixin from "~/components/mixins/mainStoreMixin.vue"
import MenuRow from "~/components/menu/MenuRow.vue";

export default defineComponent({
  name: "MenuScreen",
  mixins: [mainStoreMixin],
  components: {
    Background,
    MenuRow
  },

  methods: {
    logout() {
      this.mainStore.logout()
    }
  }

})

</script>
<style lang="scss" scoped>
.menu-hdr {
  padding: 2rem 4rem;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: stretch;
}

.menu {
  min-width: 400px;
  padding: 1rem;
  margin-left: 4rem;
  border-left: 1px solid rgba($color-main, .2);
}

.logout {
  padding: 1rem 3rem;
  border: 1px solid rgba($color-main, .5);
  cursor: pointer;
  font-size: 1.25rem;

  &:hover {
    border: 1px solid white;
    background: rgba($color-main, .05);
    span {
      animation: pulsebg 1s infinite;
    }
  }
}
</style>