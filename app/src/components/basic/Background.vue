<template>

  <div class="screen screen__background" :style=filter>
    <div class="svg-wrapper" :style=imageUrl></div>
    <div class="screen bg-under"></div>

    <audio ref="bgAudio" loop hidden>
      <source :src=audioUrl type="audio/ogg">
    </audio>

  </div>

</template>

<script type="ts">
import { defineComponent } from 'vue'
import bevelSvg from '@/assets/img/bevel.svg'
import bgAudio from '@/assets/sound/bg.ogg'

export default defineComponent({

  // hue, opacity, brightness
  // 190, 85, 120 - red
  // 315, 75, 200 - green
  // 140, 80, 80 - cyberpink

  props: {
    hue: {
      type: Number,
      default: 0
    },
    brightness: {
      type: Number,
      default: 100
    },
    opacity: {
      type: Number,
      default: 100
    },
    muted: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    imageUrl() {
      return {backgroundImage: `url(${bevelSvg})`};
    },
    audioUrl() {
      return bgAudio
    },
    filter() {
      return {
        filter: `hue-rotate(${this.hue}deg) brightness(${this.brightness}%)`,
        opacity: `${this.opacity}%`,
      };
    }
  },

  mounted() {
    if (!this.muted) this.$refs.bgAudio.play()
  }

})
</script>

<style lang="scss">
@import '@/assets/style/variables';

.screen__background, .svg-wrapper{
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: -100;
}

.bg-under {
  opacity: 0.2;
  background-image:
      radial-gradient(
              ellipse farthest-corner,
              gray,
              black 90%
      );
  animation: pulse 15s linear infinite;
}


@keyframes pulse {
  0% { opacity: .25; }
  25% { opacity: .18; }
  50% { opacity: .2; }
  75% { opacity: .18; }
  100% { opacity: .25; }
}

</style>
