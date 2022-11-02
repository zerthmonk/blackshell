<template>
  <div class="screen powerSurge">
    <div class="text">
      <text-bar :message="message"></text-bar>
    </div>
    <div class="screen screen__background" :style="backgroundUrl"></div>
  </div>
</template>

<script>
import bevelSvg from '~/assets/img/bevel.svg'
import background from '~/assets/img/bg.png'

import TextBar from '~/components/basic/TextBar.vue'
import Background from "~/components/basic/Background.vue"
import mainStoreMixin from "~/components/mixins/mainStoreMixin.vue"

export default {
  name: 'powerOff',
  mixins: [mainStoreMixin],
  components: {
    TextBar,
    Background
  },

  computed: {
    message() {
      return this.mainStore.labels.poweroff
    },
    backgroundUrl() {
      return {
        opacity: '0.5',
        backgroundImage: `url(${background})`
      }
    }
  }

}

</script>
<style lang="scss">
@import '~/assets/style/distort.scss';

.text {
  width: 100%;
  height: calc(100% - 4rem);
  font-size: 2rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.powerSurge {
  opacity: .5;
  animation: disabled 5s infinite;
}

.hdr-text-powered-off {
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 1.25rem;
  font-weight: bold;
  color: #444444;
}

@keyframes disabled {
  0% { opacity: 0; }
  10% { opacity: 25%; }
  15% { opacity: 10%; }
  20% { opacity: 5%; }
  45% { opacity: 5%; }
  50% { opacity: 25%; }
  60% { opacity: 5; }
  70% { opacity: 10; }
  75% { opacity: 25%; }
  80% { opacity: 10; }
  100% { opacity: 0; }
}
</style>