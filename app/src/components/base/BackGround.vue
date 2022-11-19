<template>
  <div class="bg-layer" :style="filterStyle">
    <div class="bg-layer" :style="bevelStyle"></div>
    <div class="bg-layer textured" :style="backgroundStyle"></div>

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
import { defineProps, withDefaults, computed, onMounted, ref } from "vue";
import bevelSvg from "~/public/assets/img/bevel.min.svg";
import background from "~/public/assets/img/bg.png";
import bgAudio from "~/public/assets/sound/bg.ogg";

export interface BackgroundProps {
  theme?: string;
  muted?: boolean;
}

const filters: Record<string, [number, number, number]> = {
  // hue, opacity, brightness
  default: [149, 80, 80],
  danger: [190, 85, 120],
  normal: [315, 75, 200],
};

const props: Required<BackgroundProps> = withDefaults(
  defineProps<BackgroundProps>(),
  {
    theme: "default",
    muted: true,
  }
);
const soundBackground = ref(null);

const bevelStyle = { backgroundImage: `url(${bevelSvg})` };
const backgroundStyle = { backgroundImage: `url(${background})` };

const filterStyle = computed(() => {
  const [hue, opacity, brightness] = [...filters[props.theme]];
  return {
    filter: `hue-rotate(${hue}deg) brightness(${brightness}%)`,
    opacity: `${opacity}%`,
  };
});

onMounted(() => {
  if (!props.muted) {
    // soundBackground.value.play(); // fix autoplay issue
  }
});
</script>

<style lang="scss">
.bg-layer {
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

.textured {
  opacity: 0.07;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
