<template>
  <div ref="root">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const root = ref(null);
const parallel = true; // to be propsed
const speed = 1000; // to be propsed
const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const special = `[!@#$%^&*] `.split('');
const alphabet = alpha.map((x) => String.fromCharCode(x)).concat(special);

interface childTextNodeType {
  node: HTMLElement;
  text: string[];
}

// todo: fix typings
function getRandom(arr: Array<unknown>): any {
  return arr[Math.floor(Math.random()*arr.length)];
}

function shuffleSymbols(txt: string[], idx: number) {
  const shuffled = txt.map((): string => getRandom(alphabet))
  return txt.slice(0, idx + 1)
            .concat(shuffled.slice(idx + 1))
            .join('');
}

function rewriteText({node, text}: childTextNodeType) {
  text.forEach((_, i) => setTimeout(() => node.innerText = shuffleSymbols(text, i), speed / text.length * i));
}

onMounted(() => {
  // getting all child nodes with text content
  const textNodes: childTextNodeType[] = Array.from(root.value.children, (child: HTMLElement, idx: number) => ({
    node: root.value.children[idx],
    text: child?.textContent?.trim().split('') || []
  })).filter(e => e.text);
  // filling text with random symbols
  textNodes.forEach(el => el.node.textContent = shuffleSymbols(el.text, 0))
  // should text be transformed to normal simultaneously or one after another?
  const withAwait = async (node: childTextNodeType, idx: number) => {
    await new Promise((r) => setTimeout(r, speed * idx));
    rewriteText(node);
  }
  textNodes.forEach(Boolean(parallel) !== true ? withAwait : rewriteText);
})

</script>