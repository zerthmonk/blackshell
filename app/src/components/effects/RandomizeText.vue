<template>
  <div ref="root">
    <slot></slot>
  </div>

  <audio
      ref="audio"
      :src="soundPrinting"
      preload
      loop
    ></audio>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, defineProps, withDefaults } from "vue";
import soundPrinting from '~/public/assets/sound/printing.ogg';

interface propsType {
  parallel?: boolean;
  speed?: number;
  muted?: boolean;
}

interface childTextNodeType {
  node: HTMLElement;
  text: string[];
}

const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const special = `[!@#$%^&*] `.split('');
const alphabet = alpha.map((x) => String.fromCharCode(x)).concat(special);

const props: Required<propsType> = withDefaults(defineProps<propsType>(), {
  speed: 20,
  muted: false,
  parallel: false
})

const root = ref(null);
const audio = ref(null);
const printing = ref(false);

function setDelay(t: number) {
  return new Promise(resolve => setTimeout(resolve, t));
}

// todo: fix typings
function getRandom(arr: Array<unknown>): any {
  return arr[Math.floor(Math.random()*arr.length)];
}

function shuffleSymbols(txt: string[], idx: number) {
  const shuffled = txt.map((char): string => char !== ' ' ? getRandom(alphabet) : char)
  return txt.slice(0, idx + 1)
            .concat(shuffled.slice(idx + 1))
            .join('');
}

function toRewriteText(item: childTextNodeType) {
  const timeouts = () => item.text.map((_, i) => {
    setTimeout(() => item.node.innerText = shuffleSymbols(item.text, i), item.text.length * i / props.speed)
  });

  return {
    execute: timeouts,
    delay: item.text.length ** 2 / props.speed
  }
}

async function togglePrinting(delay: number) {
  printing.value = true;
  await setDelay(delay);
  printing.value = false;
}

watch(
  () => printing.value,
  () => {
    if (!props.muted && printing.value === true) {
      const rate = props.speed * 0.5;
      audio.value.playbackRate = rate > 16 ? 16 : rate;
      audio.value.play();
    } else if (printing.value === false) {
      audio.value.pause();
    }
  }
)

onMounted(async () => {
  // getting all child nodes with text content
  const textNodes: childTextNodeType[] = Array.from(root.value.children, (child: HTMLElement, idx: number) => ({
    node: root.value.children[idx],
    text: child?.textContent?.trim().split('') || []
  })).filter(e => e.text);
  // filling text with random symbols
  textNodes.forEach(el => el.node.textContent = shuffleSymbols(el.text, 0))
  // should text be transformed to normal simultaneously or one after another?
  const delayedCalls = textNodes.map(toRewriteText);
  if (props.parallel === true) {
    delayedCalls.flat().map(item => item?.execute());
    togglePrinting(delayedCalls[0].delay);
  } else {
    for (const dc of delayedCalls) {
      dc.execute();
      togglePrinting(dc.delay);
      await setDelay(dc.delay);
    }
  }
})

</script>