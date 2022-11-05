<template>
  <div class="loading-bar">
    <div class="loading-bar__bar" :style="barStyle"></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, computed } from "vue"

interface styleType {
  animationName: string;
  animationDuration: string;
  height?: string;
  width?: string;
  minHeight?: string;
  minWidth?: string;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}

interface loadingBarProps {
  color?: string;
  duration?: number;
  invert?: boolean;
  start?: boolean;
  direction?: 'normal' | 'vertical';
}

const props = withDefaults(defineProps<loadingBarProps>(), {
  color: 'white',
  direction: 'normal',
  duration: 5,
  invert: false,
  start: false
})

function getHorizontalStyle() {
  let style: styleType = {
    height: '100%',
    minHeight: 'inherit',
    animationName: props.invert ? 'fill_invert_x' : 'fill_normal_x',
    animationDuration: `${props.duration + .3}s`,
  }
  return props.invert ? {...style, right: 0} : {...style, left: 0};
}

function getVerticalStyle() {
  let style: styleType = {
    width: '100%',
    minWidth: 'inherit',
    animationName: props.invert ? 'fill_invert_y' : 'fill_normal_y',
    animationDuration: `${props.duration + .3}s`,
  }
  return props.invert ? {...style, bottom: 0} : {...style, top: 0};
}

const barStyle = computed(() => {
  const background = {background: props.color};
  const style = props.direction === 'normal' ? getHorizontalStyle() : getVerticalStyle();
  return props.start ? {...background, ...style} : background;
})

</script>

<style lang="scss">
.loading-bar {
  position: relative;
  width: 100%;
  height: 100%;
}

.loading-bar__bar {
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

@keyframes fill_normal_x {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

@keyframes fill_invert_x {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

@keyframes fill_normal_y {
  from {
    height: 0%;
  }
  to {
    height: 100%;
  }
}

@keyframes fill_invert_y {
  from {
    height: 100%;
  }
  to {
    height: 0%;
  }
}
</style>