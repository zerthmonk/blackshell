<template>
  <div class="root">
    <span>{{props.label}}</span>
    <div class="content">
      <Cell v-for="value in content"
        class="cell"
        :hexValue="value"
        :isHighlighted="true"
        />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { defineProps, computed } from "vue";
import { useStore } from '@/stores/gridgame';
import Cell from "./Cell.vue";

const store = useStore();
const { getSelected, tries } = storeToRefs(store);

interface bufferProps {
  label: string;
}

const props = defineProps<bufferProps>();
const content = computed(() => Array(tries.value + 1).fill('').map((_, idx) => getSelected.value[idx]?.hex || '--'));

</script>

<style scoped lang="scss">
.root {
  display: flex;
  flex-direction: column;
  gap: .75rem;
  
  span {
    font-size: .75rem;
    letter-spacing: 1px;
  }
}
.content {
  display: flex;
  gap: .5rem;

  .cell {
    padding: .5rem;
  }
}
</style>