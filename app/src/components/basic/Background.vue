<template>

  <div class="screen screen__background" :style=filter>
    <div class="svg-wrapper" :style=bevelUrl></div>
    <div v-if="stripeEffect" class="screen screen__effects-stripe"></div>
    <div class="screen bg-layer_animated"></div>
    <div class="screen bg-layer_textured" :style=backgroundUrl></div>

    <audio ref="bgAudio" loop hidden>
      <source :src=audioUrl type="audio/ogg">
    </audio>

  </div>

</template>

<script type="ts">
import { defineComponent } from 'vue'
import bevelSvg from '@/assets/img/bevel.svg'
import background from '@/assets/img/bg.png'
import bgAudio from '@/assets/sound/bg.ogg'

export default defineComponent({

  data: () => ({
    themes: {
      // hue, opacity, brightness
      'default': [149, 80, 80],
      'red': [190, 85, 120],
      'green': [315, 75, 200]
    }
  }),

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
      default: false
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
    filter() {
      const [hue, opacity, brightness] = [...this.themes[this.theme]]
      return {
        filter: `hue-rotate(${hue}deg) brightness(${brightness}%)`,
        opacity: `${opacity}%`,
      };
    }
  },

  mounted() {
    if (!this.muted) this.$refs.bgAudio.play()
    [this.hue, this.opacity, this.brightness] = [...this.themes[this.theme]]
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

.bg-layer_animated {
  opacity: 0.2;
  background-image:
      radial-gradient(
              ellipse farthest-corner,
              gray,
              black 90%
      );
  animation: pulse 5s infinite alternate;
}

.bg-layer_textured {
  opacity: 0.1;
  background-repeat: no-repeat;
  background-size: cover;
}


@keyframes pulse {
  0% { opacity: .15; }
  25% { opacity: .1; }
  50% { opacity: .2; }
  75% { opacity: .1; }
  100% { opacity: .15; }
}

</style>
