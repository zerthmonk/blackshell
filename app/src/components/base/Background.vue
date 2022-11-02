<template>

  <div class="bg" :style=filter>
    <div class="bg__layer bg__svg" :style=bevelUrl></div>
    <div v-if="stripeEffect" class="bg__layer bg__layer_effect-stripe"></div>
    <div class="bg__layer bg__layer_textured" :style=backgroundUrl></div>

    <audio
      ref="soundBg"
      :src="audioUrl"
      preload
      loop
      id="audio"
      muted
    ></audio>

  </div>

</template>

<script lang="ts">
import {defineComponent} from "vue"
import bevelSvg from '~/assets/img/bevel.min.svg'
import background from '~/assets/img/bg.png'
import bgAudio from '~/assets/sound/bg.ogg'

interface backgroundTheme {
  filter: string;
  opacity: string;
}

const themes = {
  // hue, opacity, brightness
  'default': [149, 80, 80],
  'red': [190, 85, 120],
  'green': [315, 75, 200]
}

export default defineComponent({

  props: {
    theme: {
      type: String,
      default: 'green'
    },
    muted: {
      type: Boolean,
      default: false
    },
    stripeEffect: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    bevelUrl() {
      return {backgroundImage: `url(${bevelSvg})`}
    },
    backgroundUrl() {
      return {backgroundImage: `url(${background})`}
    },
    audioUrl() {
      return bgAudio
    },
    filter(): backgroundTheme {
      const [hue, opacity, brightness] = [...themes[this.theme]]
      return {
        filter: `hue-rotate(${hue}deg) brightness(${brightness}%)`,
        opacity: `${opacity}%`,
      };
    }
  },

  async mounted() {
    // if (!this.muted) this.$refs.soundBg.play(); // fix autoplay issue
    [this.hue, this.opacity, this.brightness] = [...themes[this.theme]]
  }

})
</script>

<style lang="scss">
@import '~/assets/style/variables';

.bg, .bg__layer {
  position: absolute;
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: -100;
}

.bg__layer_textured {
  opacity: 0.07;
  background-repeat: no-repeat;
  background-size: cover;
}

</style>
