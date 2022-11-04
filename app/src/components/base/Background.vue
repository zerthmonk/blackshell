<template>

  <div class="bg" :style=filterStyle>
    <div class="bg__layer bg__svg" :style=bevelStyle></div>
    <div class="bg__layer bg__layer_textured" :style=backgroundStyle></div>

    <audio
      ref="soundBackground"
      :src="bgAudio"
      :muted="muted"
      autoplay="true"
      preload="true"
      loop="true"
    ></audio>

  </div>

</template>

<script setup lang="ts">
import {defineProps, withDefaults, computed, onMounted, ref} from "vue"
import bevelSvg from '~/assets/img/bevel.min.svg'
import background from '~/assets/img/bg.png'
import bgAudio from '~/assets/sound/bg.ogg'

interface BackgroundTheme {
  filter: string;
  opacity: string;
}

interface BackgroundProps {
  theme?: string;
  muted?: boolean;
}

const filters: Record<string, [number, number, number]> = {
  // hue, opacity, brightness
  'default': [149, 80, 80],
  'danger': [190, 85, 120],
  'normal': [315, 75, 200]
}

const props: Required<BackgroundProps> = withDefaults(defineProps<BackgroundProps>(), {
  theme: 'default',
  muted: true
})
const soundBackground = ref(null);

const bevelStyle = {backgroundImage: `url(${bevelSvg})`};
const backgroundStyle = {backgroundImage: `url(${background})`};

const filterStyle: BackgroundTheme = computed(() => {
  const [hue, opacity, brightness] = [...filters[props.theme]];
  return {
    filter: `hue-rotate(${hue}deg) brightness(${brightness}%)`,
    opacity: `${opacity}%`,
  };
})

onMounted(() => {
  if (!props.muted) {
    // soundBackground.value.play(); // fix autoplay issue
  }
})

</script>

<style lang="scss">
@import '~/assets/style/variables';

.bg, .bg__layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 0;
  transform: scale(100.8%); // subtlier bevels
}

.bg__layer_textured {
  opacity: 0.07;
  background-repeat: no-repeat;
  background-size: cover;
}

@media only screen and (max-width: 768px) {
  .bg {
    // simple & dirty 'cuz no accessibility options for background exists
    transform: scaleY(102%) scaleX(99%);
    opacity: .3 !important;
  }
}

</style>
